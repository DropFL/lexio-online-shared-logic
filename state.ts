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
  tiles?: ArrayLike<Tile>; // undefined if other player
  disconnected: boolean;

  lastAction: {
    type: "pass" | "play" | "";
    tiles: ArrayLike<Tile>;
  };
};

export type GameStatus = "waiting" | "starting" | "ongoing";

export type GameState = {
  players: ArrayLike<PlayerState>;
  currentPlayerIndex: number;
  status: GameStatus;
};

export const getLastHandPlayed = (state: GameState): Hand | null => {
  const lastPlayActionIndex = Array.from(state.players).findIndex(
    (p) => p.lastAction.type === "play"
  );
  if (lastPlayActionIndex === -1) {
    return null;
  }

  const topNumber = getTopNumber(state.players.length);
  return getHand(
    Array.from(state.players[lastPlayActionIndex].lastAction.tiles),
    topNumber
  );
};
