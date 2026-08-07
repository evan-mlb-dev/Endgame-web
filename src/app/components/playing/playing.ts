import { Component, inject, Input } from '@angular/core';
import { Game } from '@app/models/game';
import { GameStatus } from '@app/models/game-status.enum';
import { UserGame } from '@app/models/userGame';
import { UserGameService } from '@app/services/userGameService';
import { GameCard } from '../game-card/game-card';
@Component({
  selector: 'app-playing',
  imports: [GameCard],
  templateUrl: './playing.html',
  styleUrl: './playing.scss',
})
export class Playing {
  //service
  userGameService: UserGameService = inject(UserGameService);

  //vars
  cardSize = 'small';
  @Input() uGames: Partial<Record<GameStatus, UserGame[]>> | null = null;
  @Input() games: Game[] | undefined;
  @Input() cardSizeBacklog: any;
  //subs
}
