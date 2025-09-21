import { Tile, isValidTile } from "./tile";

export const CLIENT_ACTION = {
  PLAY_HAND: "play_hand",
  PASS: "pass",
  READY: "ready",
  START: "start",
} as const;

export const SERVER_ACTION = {
  ROUND_END: "round_end",
  GAME_END: "game_end",
};

// Client action payloads
export type PlayHandPayload = Tile[];
export type ReadyPayload = boolean;

// Server action payloads
export type RoundEndPayload = {
  playerId: string;
  tiles: Tile[];
  penalty: number;
  prevBudget: number;
  newBudget: number;
}[];

export type GameEndPayload = {
  playerId: string;
  budget: number;
  // quitted: boolean;
}[];

// Client action type guards

export const isPlayHandPayload = (
  payload: unknown
): payload is PlayHandPayload => {
  return Array.isArray(payload) && payload.every(isValidTile);
};

export const isReadyPayload = (payload: unknown): payload is ReadyPayload => {
  return typeof payload === "boolean";
};
