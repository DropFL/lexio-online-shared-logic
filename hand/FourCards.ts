import { Tile, TileNumber, compareTileNumber } from "../tile";

import Made from "./Made";

export default class FourCards extends Made {
  private constructor(
    tiles: [Tile, Tile, Tile, Tile, Tile],
    readonly number: TileNumber
  ) {
    super("FOUR_CARDS", tiles);
  }

  protected isStronger(other: this): boolean {
    return compareTileNumber(this.number, other.number) > 0;
  }

  static from(tiles: Tile[]): FourCards | null {
    if (tiles.length !== 5) {
      return null;
    }

    const sortedTiles = [...tiles].sort((a, b) =>
      compareTileNumber(a.number, b.number)
    ) as [Tile, Tile, Tile, Tile, Tile];

    if (sortedTiles[0].number === sortedTiles[3].number) {
      // XXXXY four cards; the quadruplet is at the start
      return new FourCards(sortedTiles, sortedTiles[0].number);
    }

    if (sortedTiles[1].number === sortedTiles[4].number) {
      // XYYYY four cards; the quadruplet is at the end
      return new FourCards(sortedTiles, sortedTiles[4].number);
    }

    return null;
  }
}
