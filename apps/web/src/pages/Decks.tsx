import { memo } from "react";

import { DeckDex } from "@/components/DeckDex";
import { pipeline } from "@/utils/pipeline";

function DecksPage() {
  return <DeckDex />;
}

export default pipeline(memo)(DecksPage);
