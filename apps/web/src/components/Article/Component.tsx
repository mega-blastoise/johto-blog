import { memo } from "react";
import { useParams } from "react-router";

import { SuspenseEnabledQuery } from "@/components/Base/SEQ";
import { useGetCatalog } from "@/hooks/useCatalog";
import { useGetPost, useGetRelatedPosts } from "@/hooks/usePosts";
import { todayIso } from "@/utils/dates";
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
  const catalogQuery = useGetCatalog();
  return (
    <ArticleView
      article={articleQuery.data}
      catalog={catalogQuery.data}
      relatedPosts={relatedPostsQuery.data}
      today={todayIso()}
    />
  );
}

export default pipeline(memo)(Article);
