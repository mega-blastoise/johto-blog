import { useMemo, useState } from "react";

import type { ArticleKind } from "@prize-map/types";

import { ArticleCard } from "@/components/ArticleCard";
import { FilterBar } from "@/components/FilterBar";
import copy from "@/content/en.json";
import { filterPosts } from "@/services/Posts";
import { formatMessage } from "@/utils/formatMessage";

import type { PostsViewProps } from "./types";

function PostsView({ posts }: PostsViewProps) {
  const [kind, setKind] = useState<ArticleKind | "all">("all");
  const [query, setQuery] = useState("");
  const matchingPosts = useMemo(
    () => filterPosts(posts, query, kind),
    [kind, posts, query],
  );

  return (
    <section className="journal" aria-labelledby="journal-title">
      <div className="section-heading section-heading--journal">
        <div>
          <p className="eyebrow">{copy.posts.eyebrow}</p>
          <h1 id="journal-title">{copy.posts.title}</h1>
          <p className="section-heading__description">
            {copy.posts.description}
          </p>
        </div>
        <p className="section-heading__aside">
          {formatMessage(copy.posts.archiveDetail, { count: posts.length })}
        </p>
      </div>
      <FilterBar
        kind={kind}
        onKindChange={setKind}
        onQueryChange={setQuery}
        query={query}
      />
      <div className="article-grid" aria-live="polite">
        {matchingPosts.map((post) => (
          <ArticleCard article={post} key={post.slug} />
        ))}
      </div>
      {matchingPosts.length === 0 ? (
        <p className="empty-state">{copy.posts.emptyState}</p>
      ) : null}
    </section>
  );
}

export default PostsView;
