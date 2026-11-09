import type { DeckArchetype, Matchup } from "@prize-map/types";

export interface MatchupTableProps {
  matchups: readonly Matchup[];
  counters: readonly string[];
  decks: readonly DeckArchetype[];
}
