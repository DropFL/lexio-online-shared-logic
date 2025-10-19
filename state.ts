import { Hand, getHand } from "./hand";

import { Tile } from "./tile";
import { getTopNumber } from "./utils";

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

  lastAction: {
    type: "pass" | "play" | "";
    tiles: Tile[];
  };
};

export type GameStatus = "waiting" | "starting" | "ongoing";

export type GameState = {
  players: PlayerState[];
  currentPlayerIndex: number;
  status: GameStatus;
};

export const getLastHandPlayed = (state: GameState): Hand | null => {
  const lastPlayActionIndex = state.players.findIndex(
    (p) => p.lastAction.type === "play"
  );
  if (lastPlayActionIndex === -1) {
    return null;
  }

  const topNumber = getTopNumber(state.players.length);
  return getHand(
    state.players[lastPlayActionIndex].lastAction.tiles,
    topNumber
  );
};
