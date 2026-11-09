import { memo } from "react";
import { useParams } from "react-router";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetCatalog } from "@/hooks/useCatalog";
import { todayIso } from "@/utils/dates";
import { pipeline } from "@/utils/pipeline";

import DeckEntryView from "./View";

function DeckEntry() {
  return (
    <SuspenseEnabledQuery>
      <DeckEntryData />
    </SuspenseEnabledQuery>
  );
}

function DeckEntryData() {
  const { archetype = "" } = useParams<{ archetype: string }>();
  const catalogQuery = useGetCatalog();
  return (
    <DeckEntryView
      catalog={catalogQuery.data}
      archetype={archetype}
      today={todayIso()}
    />
  );
}

export default pipeline(memo)(DeckEntry);
