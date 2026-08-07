import { Component, inject, Input } from '@angular/core';
import { Game } from '@app/models/game';
import { GameStatus } from '@app/models/game-status.enum';
import { UserGame } from '@app/models/userGame';
import { UserGameService } from '@app/services/userGameService';
import { GameCard } from '../game-card/game-card';

@Component({
  selector: 'app-to-play',
  imports: [GameCard],
  templateUrl: './to-play.html',
  styleUrl: './to-play.scss',
})
export class ToPlay {
  //service
  userGameService: UserGameService = inject(UserGameService);

  //vars
  cardSize = 'small';
  @Input() uGames: Partial<Record<GameStatus, UserGame[]>> | null = null;
  @Input() games: Game[] | undefined;
  @Input() cardSizeBacklog: any;
  //subs
}
