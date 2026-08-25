import { Component, inject, input, signal } from '@angular/core';
import { Game } from '@app/models/game';
import { GameStatus } from '@app/models/game-status.enum';
import { UserGame } from '@app/models/userGame';
import { AuthService } from '@app/services/authService';
import { GameService } from '@app/services/gameService';
import { UserGameService } from '@app/services/userGameService';
import { Subscription } from 'rxjs';
import { Ended } from '../ended/ended';
import { CardSize } from '../game-card/cardsize';
import { Playing } from '../playing/playing';
import { ToPlay } from '../to-play/to-play';

@Component({
  selector: 'app-backlog',
  imports: [Playing, ToPlay, Ended],
  templateUrl: './backlog.html',
  styleUrl: './backlog.scss',
})
export class Backlog {
  // services
  private userGameService = inject(UserGameService);
  private gameService = inject(GameService);
  private authService = inject(AuthService);
  //vars
  userGames: Partial<Record<GameStatus, UserGame[]>> | null = null;
  // Déclaration en Signal
  games = signal<Game[]>([]);
  gamesToPlay = signal<Game[]>([]);
  gamesPlaying = signal<Game[]>([]);
  gamesEnded = signal<Game[]>([]);
  status = input<string>();
  cardSizeBacklog = signal<CardSize>('small');
  //subs
  private subUserGames?: Subscription;

  ngOnInit(): void {
    if (this.authService.isSessionValid()) {
      // UserGames
      this.userGameService.refreshUserGames();
      this.subUserGames = this.userGameService.userGames$.subscribe(
        (userGames) => {
          this.userGames = userGames;

          if (userGames) {
            const gameIds = this.userGameService.getUserGamesIds(userGames);

            if (gameIds.length > 0) {
              this.gameService.getGamesByIds(gameIds).subscribe((gamesData) => {
                // 1. Global update
                this.games.set(gamesData);
                // 2. Filter by games status
                if (userGames) {
                  // Extract Game Ids
                  const toPlayIds = new Set(
                    userGames.TO_PLAY?.map((ug) => ug.gameId) ?? [],
                  );
                  const playingIds = new Set(
                    userGames.PLAYING?.map((ug) => ug.gameId) ?? [],
                  );
                  const endedIds = new Set([
                    ...(userGames.COMPLETED?.map((ug) => ug.gameId) ?? []),
                    ...(userGames.DROPPED?.map((ug) => ug.gameId) ?? []),
                    ...(userGames.ON_HOLD?.map((ug) => ug.gameId) ?? []),
                  ]);

                  // set Signals
                  this.gamesToPlay.set(
                    gamesData.filter((game) => toPlayIds.has(game.id)),
                  );
                  this.gamesPlaying.set(
                    gamesData.filter((game) => playingIds.has(game.id)),
                  );
                  this.gamesEnded.set(
                    gamesData.filter((game) => endedIds.has(game.id)),
                  );
                }
              });
            }
          }
        },
      );
    } else {
      console.error('ANONYMOUS USER');
    }
  }
  ngOnDestroy(): void {
    this.subUserGames?.unsubscribe();
  }
}
