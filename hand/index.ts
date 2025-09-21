import Flush from "./Flush";
import FourCards from "./FourCards";
import FullHouse from "./FullHouse";
import { Hand } from "./Hand";
import Pair from "./Pair";
import Single from "./Single";
import Straight from "./Straight";
import { Tile } from "../tile";
import Triple from "./Triple";

export * from "./Hand";
export * from "./Made";

export const getHand = (tiles: Tile[], topNumber: number): Hand | null => {
  return (
    Single.from(tiles) ??
    Pair.from(tiles) ??
    Triple.from(tiles) ??
    FullHouse.from(tiles) ??
    FourCards.from(tiles) ??
    // IMPORTANT: Straight must be checked before Flush
    // because it can be a Straight Flush
    Straight.from(tiles, topNumber) ??
    Flush.from(tiles) ??
    null
  );
};
