import { Tile } from "./tile";

export type PlayerState = {
  id: string;
  name: string;

  // states while waiting
  isReady: boolean;

  // states while playing
  budget: number;
  tileCount: number;
  tiles?: Tile[]; // undefined if other player
  disconnected: boolean; // undefined if other player
};

export type GameStatus = "waiting" | "starting" | "ongoing";

export type GameState = {
  players: PlayerState[];
  currentPlayerIndex: number;
  status: GameStatus;
};
