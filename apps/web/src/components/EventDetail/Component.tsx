import { memo } from "react";
import { useParams } from "react-router";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetCatalog } from "@/hooks/useCatalog";
import { todayIso } from "@/utils/dates";
import { pipeline } from "@/utils/pipeline";

import EventDetailView from "./View";

function EventDetail() {
  return (
    <SuspenseEnabledQuery>
      <EventDetailData />
    </SuspenseEnabledQuery>
  );
}

function EventDetailData() {
  const { slug = "" } = useParams<{ slug: string }>();
  const catalogQuery = useGetCatalog();
  return (
    <EventDetailView
      catalog={catalogQuery.data}
      slug={slug}
      today={todayIso()}
    />
  );
}

export default pipeline(memo)(EventDetail);
