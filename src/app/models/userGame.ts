import { GameStatus } from './game-status.enum';

export interface UserGame {
  id: number;
  userId: number;
  gameId: number;
  status: GameStatus;
  personalNote?: string | null;
  personalRating?: number | null;
}

export type UserGamesMap = Partial<Record<GameStatus, UserGame[]>>;
