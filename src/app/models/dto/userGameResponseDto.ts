import { GameStatus } from '../game-status.enum';

export interface UserGameResponseDto {
  message: string;
  userId: number;
  gameId: string;
  newStatus: GameStatus;
}
export interface UserGamesDto {
  id: number;
  gameId: number;
  name: string;
  backgroundImage?: string;
  rating?: number;
  metacritic?: number;
  status: GameStatus;
}
