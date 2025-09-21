import { Tile, TileNumber, compareTileNumber } from "../tile";

import Made from "./Made";

export default class FullHouse extends Made {
  private constructor(
    tiles: [Tile, Tile, Tile, Tile, Tile],
    readonly number: TileNumber
  ) {
    super("FULL_HOUSE", tiles);
  }

  protected isStronger(other: this): boolean {
    return compareTileNumber(this.number, other.number) > 0;
  }

  static from(tiles: Tile[]): FullHouse | null {
    if (tiles.length !== 5) {
      return null;
    }

    const sortedTiles = [...tiles].sort((a, b) =>
      compareTileNumber(a.number, b.number)
    ) as [Tile, Tile, Tile, Tile, Tile];

    if (
      sortedTiles[0].number === sortedTiles[2].number &&
      sortedTiles[3].number === sortedTiles[4].number
    ) {
      // XXXYY full house; the triplet is at the start
      return new FullHouse(sortedTiles, sortedTiles[0].number);
    }

    if (
      sortedTiles[0].number === sortedTiles[1].number &&
      sortedTiles[2].number === sortedTiles[4].number
    ) {
      // XXYYY full house; the triplet is at the end
      return new FullHouse(sortedTiles, sortedTiles[4].number);
    }

    return null;
  }
}
