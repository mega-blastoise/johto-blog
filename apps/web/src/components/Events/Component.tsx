import { memo } from "react";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetCatalog } from "@/hooks/useCatalog";
import { todayIso } from "@/utils/dates";
import { pipeline } from "@/utils/pipeline";

import EventsView from "./View";

function Events() {
  return (
    <SuspenseEnabledQuery>
      <EventsData />
    </SuspenseEnabledQuery>
  );
}

function EventsData() {
  const catalogQuery = useGetCatalog();
  return <EventsView catalog={catalogQuery.data} today={todayIso()} />;
}

export default pipeline(memo)(Events);
