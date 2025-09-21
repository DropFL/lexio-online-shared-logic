export const ErrorCode = {
  // Common error codes
  INVALID_ACTION: 10000,
  MALFORMED_PAYLOAD: 10001,
  NOT_PARTICIPANT: 10002,
  GAME_STARTED: 10003,
  GAME_NOT_STARTED: 10004,

  // Start error codes
  UNREADY_PLAYERS: 20000,
  NOT_ENOUGH_PLAYERS: 20001,

  // Pass/Play error codes
  NOT_YOUR_TURN: 30001,
  INVALID_HAND: 30002,
  UNPLAYABLE_HAND: 30003,
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
