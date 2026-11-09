import { memo } from "react";
import { useParams } from "react-router";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetCatalog } from "@/hooks/useCatalog";
import { todayIso } from "@/utils/dates";
import { pipeline } from "@/utils/pipeline";

import SetDetailView from "./View";

function SetDetail() {
  return (
    <SuspenseEnabledQuery>
      <SetDetailData />
    </SuspenseEnabledQuery>
  );
}

function SetDetailData() {
  const { code = "" } = useParams<{ code: string }>();
  const catalogQuery = useGetCatalog();
  return (
    <SetDetailView catalog={catalogQuery.data} code={code} today={todayIso()} />
  );
}

export default pipeline(memo)(SetDetail);
