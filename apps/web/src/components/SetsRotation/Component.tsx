import { memo } from "react";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetCatalog } from "@/hooks/useCatalog";
import { todayIso } from "@/utils/dates";
import { pipeline } from "@/utils/pipeline";

import SetsRotationView from "./View";

function SetsRotation() {
  return (
    <SuspenseEnabledQuery>
      <SetsRotationData />
    </SuspenseEnabledQuery>
  );
}

function SetsRotationData() {
  const catalogQuery = useGetCatalog();
  return <SetsRotationView catalog={catalogQuery.data} today={todayIso()} />;
}

export default pipeline(memo)(SetsRotation);
