/////////////////////////////////
// Type definitions
/////////////////////////////////

const TILE_COLORS = ["SUN", "MOON", "STAR", "CLOUD"] as const;
const TILE_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
] as const;

export type TileColor = (typeof TILE_COLORS)[number];
export type TileNumber = (typeof TILE_NUMBERS)[number];

export type Tile = {
  number: TileNumber;
  color: TileColor;
};

/////////////////////////////////
// Utility functions
/////////////////////////////////

export const isTileColor = (value: any): value is TileColor => {
  return TILE_COLORS.find(value) !== undefined;
};

export const isTileNumber = (value: any): value is TileNumber => {
  return TILE_NUMBERS.find(value) !== undefined;
};

export const isValidTile = (tile: Tile, topNumber: number): boolean => {
  return (
    isTileNumber(tile.number) &&
    isTileColor(tile.color) &&
    tile.number <= topNumber
  );
};

export const compareTileNumber = (n1: TileNumber, n2: TileNumber) => {
  const level1 = numberToLevel(n1);
  const level2 = numberToLevel(n2);
  return level1 - level2;
};

export const compareTileColor = (c1: TileColor, c2: TileColor) => {
  const colorLevel1 = colorToLevel(c1);
  const colorLevel2 = colorToLevel(c2);
  return colorLevel1 - colorLevel2;
};

export const compareTile = (t1: Tile, t2: Tile) => {
  const numberComparison = compareTileNumber(t1.number, t2.number);
  if (numberComparison !== 0) {
    return numberComparison;
  }

  return compareTileColor(t1.color, t2.color);
};

export const generateAllTiles = (topNumber: number): Tile[] => {
  const tiles: Tile[] = [];
  for (const color of TILE_COLORS) {
    for (const number of TILE_NUMBERS) {
      if (number <= topNumber) {
        tiles.push({ number, color });
      }
    }
  }
  return tiles;
};

export const isStartingTile = (tile: Tile): boolean => {
  return tile.number === 3 && tile.color === "CLOUD";
};

/////////////////////////////////
// Internal functions
/////////////////////////////////

const numberToLevel = (number: TileNumber) => {
  if (number === 1 || number === 2) {
    return number + 99;
  } else {
    return number;
  }
};

const colorToLevel = (color: TileColor) => {
  switch (color) {
    case "SUN":
      return 4;
    case "MOON":
      return 3;
    case "STAR":
      return 2;
    case "CLOUD":
      return 1;
  }
};
