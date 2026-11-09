import { memo } from "react";

import { DeckEntry } from "@/components/DeckEntry";
import { pipeline } from "@/utils/pipeline";

function DeckPage() {
  return <DeckEntry />;
}

export default pipeline(memo)(DeckPage);
