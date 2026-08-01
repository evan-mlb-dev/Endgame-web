import { GameStatus } from './game-status.enum';

export interface UserGameResponseDto {
  message: string;
  userId: number;
  gameId: string;
  newStatus: GameStatus;
}
