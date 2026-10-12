import { memo } from "react";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetPosts } from "@/hooks/usePosts";
import { pipeline } from "@/utils/pipeline";

import PostsView from "./View";

function Posts() {
  return (
    <SuspenseEnabledQuery>
      <PostsData />
    </SuspenseEnabledQuery>
  );
}

function PostsData() {
  const postsQuery = useGetPosts();
  return <PostsView posts={postsQuery.data} />;
}

export default pipeline(memo)(Posts);
