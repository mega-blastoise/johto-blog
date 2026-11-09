import type { DeckEntry } from "@/services/Catalog";
import type { CardSet } from "@prize-map/types";

export interface DeckCardProps {
  entry: DeckEntry;
  /** Set it was built before, if the latest list is out of date. */
  newerSet?: CardSet;
}
