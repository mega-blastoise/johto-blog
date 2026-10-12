import { memo } from "react";
import { useParams } from "react-router";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetPost, useGetRelatedPosts } from "@/hooks/usePosts";
import { pipeline } from "@/utils/pipeline";

import ArticleView from "./View";

function Article() {
  return (
    <SuspenseEnabledQuery>
      <ArticleData />
    </SuspenseEnabledQuery>
  );
}

function ArticleData() {
  const { slug = "" } = useParams<{ slug: string }>();
  const articleQuery = useGetPost(slug);
  const relatedPostsQuery = useGetRelatedPosts(slug);
  return (
    <ArticleView
      article={articleQuery.data}
      relatedPosts={relatedPostsQuery.data}
    />
  );
}

export default pipeline(memo)(Article);
