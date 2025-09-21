import {
  Tile,
  TileColor,
  TileNumber,
  compareTileColor,
  compareTileNumber,
} from "../tile";

import Made from "./Made";

export default class Flush extends Made {
  readonly numbers: TileNumber[];
  readonly color: TileColor;

  private constructor(tiles: [Tile, Tile, Tile, Tile, Tile]) {
    super("FLUSH", tiles);
    this.numbers = tiles
      .map((tile) => tile.number)
      .sort(compareTileNumber)
      .reverse(); // Descending order
    this.color = tiles[0].color;
  }

  protected isStronger(other: this): boolean {
    for (let i = 0; i < this.numbers.length; i++) {
      if (this.numbers[i] !== other.numbers[i]) {
        return compareTileNumber(this.numbers[i], other.numbers[i]) > 0;
      }
    }

    return compareTileColor(this.color, other.color) > 0;
  }

  static from(tiles: Tile[]): Flush | null {
    if (tiles.length !== 5) {
      return null;
    }

    if (tiles.every((tile) => tile.color === tiles[0].color)) {
      return new Flush(tiles as [Tile, Tile, Tile, Tile, Tile]);
    }

    return null;
  }
}
