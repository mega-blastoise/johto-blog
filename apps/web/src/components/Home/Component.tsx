import { memo } from "react";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetPosts } from "@/hooks/usePosts";
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
  const postsQuery = useGetPosts();
  return <HomeView posts={postsQuery.data} />;
}

export default pipeline(memo)(Home);
