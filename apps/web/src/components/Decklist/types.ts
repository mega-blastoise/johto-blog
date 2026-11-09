import type { Decklist } from "@prize-map/types";

export interface DecklistProps {
  decklist: Decklist;
  /** e.g. "v4", shown beside the heading. */
  version?: string;
}

export type CopyState = "idle" | "copied" | "failed";

export interface DecklistViewProps extends DecklistProps {
  copyState: CopyState;
  onCopy: () => void;
}
