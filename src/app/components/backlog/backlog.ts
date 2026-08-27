import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Game } from '@app/models/game';
import { GameStatus } from '@app/models/game-status.enum';
import { Session } from '@app/models/session';
import { UserGame } from '@app/models/userGame';
import { AuthService } from '@app/services/authService';
import { GameService } from '@app/services/gameService';
import { ModalService } from '@app/services/modalService';
import { UserGameService } from '@app/services/userGameService';
import { map, Subscription } from 'rxjs';
import { Ended } from '../ended/ended';
import { CardSize } from '../game-card/cardsize';
import { Playing } from '../playing/playing';
import { ToPlay } from '../to-play/to-play';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [Playing, ToPlay, Ended],
  templateUrl: './backlog.html',
  styleUrl: './backlog.scss',
})
export class Backlog implements OnInit, OnDestroy {
  // Services
  private userGameService = inject(UserGameService);
  private gameService = inject(GameService);
  private authService = inject(AuthService);
  private modalService = inject(ModalService);
  // Session
  public currentSession: Session | null = null;

  // Subscriptions
  private subUserGames?: Subscription;
  private sessionSubscription!: Subscription;

  // Signal
  status = input<string>();
  cardSizeBacklog = signal<CardSize>('small');
  games = signal<Game[]>([]);
  userGames = signal<Partial<Record<GameStatus, UserGame[]>> | null>(null);
  // Signal computing
  gamesToPlay = computed(() => {
    const ids = new Set(
      this.userGames()?.TO_PLAY?.map((ug) => ug.gameId) ?? [],
    );
    return this.games().filter((game) => ids.has(game.id));
  });

  gamesPlaying = computed(() => {
    const ids = new Set(
      this.userGames()?.PLAYING?.map((ug) => ug.gameId) ?? [],
    );
    return this.games().filter((game) => ids.has(game.id));
  });

  gamesEnded = computed(() => {
    const userGamesData = this.userGames();
    const ids = new Set([
      ...(userGamesData?.COMPLETED?.map((ug) => ug.gameId) ?? []),
      ...(userGamesData?.DROPPED?.map((ug) => ug.gameId) ?? []),
      ...(userGamesData?.ON_HOLD?.map((ug) => ug.gameId) ?? []),
    ]);
    return this.games().filter((game) => ids.has(game.id));
  });

  ngOnInit(): void {
    this.sessionSubscription = this.authService.userSession$.subscribe({
      next: (session: Session | null) => {
        if (session) {
          this.currentSession = session;
        }
      },
      error: (err) => console.error('Error :', err),
    });

    if (this.authService.isSessionValid()) {
      // Chargement initial des jeux utilisateur
      this.userGameService.refreshUserGames();

      this.subUserGames = this.userGameService.userGames$.subscribe(
        (userGames) => {
          // Met à jour le signal réactif
          this.userGames.set(userGames);

          if (userGames) {
            const gameIds = this.userGameService.getUserGamesIds(userGames);

            if (gameIds.length > 0) {
              this.gameService
                .getGamesByIds(gameIds)
                .pipe(
                  map((rawGames) =>
                    rawGames.map((gameData) =>
                      Object.assign(new Game(), gameData),
                    ),
                  ),
                )
                .subscribe((gamesData) => {
                  this.games.set(gamesData);
                });
            } else {
              this.games.set([]);
            }
          }
        },
      );
    } else {
      this.modalService.openSignInModal();
    }
  }

  ngOnDestroy(): void {
    this.subUserGames?.unsubscribe();
    this.sessionSubscription?.unsubscribe();
  }
}
