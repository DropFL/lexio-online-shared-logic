import {
  FIVE_PLAYERS_TOP_NUMBER,
  FOUR_PLAYERS_TILES_PER_PLAYER,
  FOUR_PLAYERS_TOP_NUMBER,
  THREE_PLAYERS_TILES_PER_PLAYER,
  THREE_PLAYERS_TOP_NUMBER,
} from "./constants";
import { Tile, TileNumber } from "./tile";

export const getPenalty = (tiles: Tile[]): number => {
  const basePenalty = tiles.length;
  const multiplier = tiles
    .filter((tile) => tile.number === 2)
    .reduce((acc) => acc * 2, 1);
  return basePenalty * multiplier;
};

export const getTopNumber = (playersCount: number): TileNumber => {
  switch (playersCount) {
    case 3:
      return THREE_PLAYERS_TOP_NUMBER;
    case 4:
      return FOUR_PLAYERS_TOP_NUMBER;
    case 5:
      return FIVE_PLAYERS_TOP_NUMBER;
    default:
      throw new Error("Invalid number of players");
  }
};

export const getTilesPerPlayer = (playersCount: number): number => {
  switch (playersCount) {
    case 3:
      return THREE_PLAYERS_TILES_PER_PLAYER;
    case 4:
      return FOUR_PLAYERS_TILES_PER_PLAYER;
    case 5:
      return FIVE_PLAYERS_TOP_NUMBER;
    default:
      throw new Error("Invalid number of players");
  }
};
