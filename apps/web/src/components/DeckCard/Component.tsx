import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import DeckCardView from "./View";

import type { DeckCardProps } from "./types";

function DeckCard(props: DeckCardProps) {
  return <DeckCardView {...props} />;
}

export default pipeline(memo)(DeckCard);
