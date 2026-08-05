import { Component, inject } from '@angular/core';
import { GameStatus } from '@app/models/game-status.enum';
import { UserGame } from '@app/models/userGame';
import { AuthService } from '@app/services/authService';
import { UserGameService } from '@app/services/userGameService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-backlog',
  imports: [],
  templateUrl: './backlog.html',
  styleUrl: './backlog.scss',
})
export class Backlog {
  // services
  private userGameService = inject(UserGameService);
  private authService = inject(AuthService);
  //vars
  userGames: Partial<Record<GameStatus, UserGame[]>> | null = null;

  //subs
  private subUserGames?: Subscription;

  ngOnInit(): void {
    if (this.authService.isSessionValid()) {
      this.userGameService.refreshUserGames();
      this.subUserGames = this.userGameService.userGames$.subscribe(
        (userGames) => {
          this.userGames = userGames;
          console.debug(this.userGames);
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
