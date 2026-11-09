import { memo } from "react";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetCatalog } from "@/hooks/useCatalog";
import { todayIso } from "@/utils/dates";
import { pipeline } from "@/utils/pipeline";

import HomeView from "./View";

function Home() {
  return (
    <SuspenseEnabledQuery>
      <HomeData />
    </SuspenseEnabledQuery>
  );
}

function HomeData() {
  const catalogQuery = useGetCatalog();
  return <HomeView catalog={catalogQuery.data} today={todayIso()} />;
}

export default pipeline(memo)(Home);
