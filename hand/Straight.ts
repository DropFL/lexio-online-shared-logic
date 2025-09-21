import { Tile, compareTile, compareTileNumber } from "../tile";

import Made from "./Made";

export default class Straight extends Made {
  private constructor(
    readonly name: keyof typeof Made.HAND_LEVELS,
    tiles: [Tile, Tile, Tile, Tile, Tile]
  ) {
    super(name, tiles);
    this.tiles.sort((a, b) => compareTile(a, b) * -1); // Descending order
  }

  protected isStronger(other: this): boolean {
    for (let i = 0; i < this.tiles.length; i++) {
      const comparison = compareTile(this.tiles[i], other.tiles[i]);
      if (comparison !== 0) {
        return comparison > 0;
      }
    }

    return false; // normally unreachable
  }

  static from(tiles: Tile[], topNumber: number): Straight | null {
    if (tiles.length !== 5) {
      return null;
    }

    const sortedTiles = [...tiles].sort(
      (a, b) => compareTileNumber(a.number, b.number) * -1 // Descending order
    ) as [Tile, Tile, Tile, Tile, Tile];

    const isFlush = tiles.every((tile) => tile.color === tiles[0].color);

    if (isNormalStraight(sortedTiles)) {
      return new Straight(isFlush ? "STRAIGHT_FLUSH" : "STRAIGHT", sortedTiles);
    }

    if (isMountain(sortedTiles, topNumber)) {
      return new Straight(isFlush ? "MOUNTAIN_FLUSH" : "MOUNTAIN", sortedTiles);
    }

    if (isBackStraightFrom2(sortedTiles)) {
      return new Straight(
        isFlush ? "BACK_STRAIGHT_FLUSH_2" : "BACK_STRAIGHT_2",
        sortedTiles
      );
    }

    if (isBackStraightFrom1(sortedTiles)) {
      return new Straight(
        isFlush ? "BACK_STRAIGHT_FLUSH_1" : "BACK_STRAIGHT_1",
        sortedTiles
      );
    }

    return null;
  }
}

const isNormalStraight = (sortedTiles: Tile[]): boolean => {
  for (let i = 0; i < sortedTiles.length - 1; i++) {
    if (sortedTiles[i].number - sortedTiles[i + 1].number !== 1) {
      return false;
    }
  }
  return true;
};

const isMountain = (sortedTiles: Tile[], topNumber: number): boolean => {
  return (
    sortedTiles[0].number === 1 &&
    sortedTiles[1].number === topNumber &&
    sortedTiles[2].number === topNumber - 1 &&
    sortedTiles[3].number === topNumber - 2 &&
    sortedTiles[4].number === topNumber - 3
  );
};

const isBackStraightFrom2 = (sortedTiles: Tile[]): boolean => {
  return (
    sortedTiles[0].number === 2 &&
    sortedTiles[1].number === 6 &&
    sortedTiles[2].number === 5 &&
    sortedTiles[3].number === 4 &&
    sortedTiles[4].number === 3
  );
};

const isBackStraightFrom1 = (sortedTiles: Tile[]): boolean => {
  return (
    sortedTiles[0].number === 2 &&
    sortedTiles[1].number === 1 &&
    sortedTiles[2].number === 5 &&
    sortedTiles[3].number === 4 &&
    sortedTiles[4].number === 3
  );
};
