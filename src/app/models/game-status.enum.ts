export enum GameStatus {
  TO_PLAY = 'TO_PLAY',
  PLAYING = 'PLAYING',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
  ON_HOLD = 'ON_HOLD',
}

export type GameStatusCounts = Record<GameStatus, number>;
