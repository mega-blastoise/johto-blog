import { memo } from "react";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetCatalog } from "@/hooks/useCatalog";
import { todayIso } from "@/utils/dates";
import { pipeline } from "@/utils/pipeline";

import DeckDexView from "./View";

function DeckDex() {
  return (
    <SuspenseEnabledQuery>
      <DeckDexData />
    </SuspenseEnabledQuery>
  );
}

function DeckDexData() {
  const catalogQuery = useGetCatalog();
  return <DeckDexView catalog={catalogQuery.data} today={todayIso()} />;
}

export default pipeline(memo)(DeckDex);
