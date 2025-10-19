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
  disconnected: boolean;

  lastAction:
    | {
        type: "pass";
      }
    | {
        type: "play";
        tiles: Tile[];
      }
    | null;
};

export type GameStatus = "waiting" | "starting" | "ongoing";

export type GameState = {
  players: PlayerState[];
  currentPlayerIndex: number;
  lastPlayedPlayerIndex: number | null;
  status: GameStatus;
};

export const getLastTilesPlayed = (state: GameState): Tile[] | null => {
  if (state.lastPlayedPlayerIndex === null) {
    return null;
  }
  const lastAction = state.players[state.lastPlayedPlayerIndex].lastAction;
  if (lastAction?.type === "play") {
    return lastAction.tiles;
  }
  return null;
};
