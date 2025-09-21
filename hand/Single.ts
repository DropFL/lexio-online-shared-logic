import { Tile, compareTileNumber } from "../tile";

import { Hand } from "./Hand";

export default class Single extends Hand {
  private constructor(readonly tile: Tile) {
    super();
  }

  isPlayableOver(other: Hand): boolean {
    if (!(other instanceof Single)) {
      return false;
    }

    return compareTileNumber(this.tile.number, other.tile.number) > 0;
  }

  static from(tiles: Tile[]): Single | null {
    if (tiles.length !== 1) {
      return null;
    }

    return new Single(tiles[0]);
  }
}
