import { Tile, TileNumber, compareTileNumber } from "../tile";

import { Hand } from "./Hand";

export default class Triple extends Hand {
  readonly number: TileNumber;

  private constructor(readonly tiles: [Tile, Tile, Tile]) {
    super();
    this.number = tiles[0].number;
  }

  isPlayableOver(other: Hand): boolean {
    if (!(other instanceof Triple)) {
      return false;
    }

    return compareTileNumber(this.number, other.number) > 0;
  }

  static from(tiles: Tile[]): Triple | null {
    if (tiles.length !== 3) {
      return null;
    }

    if (
      tiles[0].number === tiles[1].number &&
      tiles[1].number === tiles[2].number
    ) {
      return new Triple([tiles[0], tiles[1], tiles[2]]);
    }

    return null;
  }
}
