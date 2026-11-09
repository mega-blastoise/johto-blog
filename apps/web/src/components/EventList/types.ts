import type { CompetitiveEvent } from "@prize-map/types";

export interface EventListProps {
  events: readonly CompetitiveEvent[];
  today: string;
  /** Upcoming lists show a countdown; past lists do not. */
  countdown?: boolean;
}
