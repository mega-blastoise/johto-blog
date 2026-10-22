import type { ArticleKind } from "@prize-map/types";

import type { EnergyType } from "@/components/EnergySymbol";

// Each post kind is broadcast in its own energy color.
export const kindEnergy: Record<ArticleKind, EnergyType> = {
  "deck-report": "fire",
  "meta-brief": "water",
  "tournament-log": "fighting",
  "tech-note": "psychic",
  process: "grass",
};

export interface KindTagProps {
  kind: ArticleKind;
}
