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
import { GameCard } from '../game-card/game-card';
import { Playing } from '../playing/playing';
import { ToPlay } from '../to-play/to-play';

@Component({
  selector: 'app-backlog',
  imports: [Playing, ToPlay, Ended, GameCard],
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
          console.debug(this.userGames);

          if (userGames) {
            const ids = this.userGameService.getUserGamesIds(userGames);

            if (ids.length > 0) {
              this.gameService.getGamesByIds(ids).subscribe((gamesData) => {
                this.games.set(gamesData);
                console.debug(this.games);
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
