import { Hand } from "./Hand";
import { Tile } from "../tile";

export default class Made extends Hand {
  protected static HAND_LEVELS = {
    STRAIGHT: 10,
    MOUNTAIN: 11, // straight ends with 1
    BACK_STRAIGHT_2: 12, // straight starts from 2
    BACK_STRAIGHT_1: 13, // straight starts from 1

    FLUSH: 20,
    FULL_HOUSE: 30,
    FOUR_CARDS: 40,

    STRAIGHT_FLUSH: 50,
    MOUNTAIN_FLUSH: 51, // straight flush ends with 1
    BACK_STRAIGHT_FLUSH_2: 52, // straight flush starts from 2
    BACK_STRAIGHT_FLUSH_1: 53, // straight flush starts from 1
  } as const;

  protected constructor(
    readonly name: keyof typeof Made.HAND_LEVELS,
    readonly tiles: [Tile, Tile, Tile, Tile, Tile]
  ) {
    super();
  }

  isPlayableOver(other: Hand): boolean {
    if (!(other instanceof Made)) {
      return false;
    }

    if (this.name !== other.name) {
      return Made.HAND_LEVELS[this.name] > Made.HAND_LEVELS[other.name];
    }

    return this.isStronger(other as this);
  }

  protected isStronger(other: this): boolean {
    throw new Error("Not implemented");
  }
}
