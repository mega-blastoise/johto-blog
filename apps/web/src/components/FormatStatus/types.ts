import type { CardSet, CompetitiveEvent } from "@prize-map/types";

export interface FormatStatusProps {
  currentSet?: CardSet;
  nextSet?: CardSet;
  nextEvent?: CompetitiveEvent;
  today: string;
}
