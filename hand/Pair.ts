import { Tile, TileNumber, compareTile, compareTileNumber } from "../tile";

import { Hand } from "./Hand";

export default class Pair extends Hand {
  readonly number: TileNumber;
  readonly hasSun: boolean;

  private constructor(readonly tiles: [Tile, Tile]) {
    super();

    this.number = tiles[0].number;
    this.hasSun = tiles[0].color === "SUN" || tiles[1].color === "SUN";
  }

  isPlayableOver(other: Hand): boolean {
    if (!(other instanceof Pair)) {
      return false;
    }

    if (this.number !== other.number) {
      return compareTileNumber(this.number, other.number) > 0;
    }

    return this.hasSun;
  }

  static from(tiles: Tile[]): Pair | null {
    if (tiles.length !== 2) {
      return null;
    }

    if (tiles[0].number === tiles[1].number) {
      return new Pair([tiles[0], tiles[1]]);
    }

    return null;
  }
}
