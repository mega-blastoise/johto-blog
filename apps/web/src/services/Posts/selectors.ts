import type { Article, ArticleKind } from "@prize-map/types";

export function sortArticles(posts: readonly Article[]): Article[] {
  return [...posts].sort((left, right) =>
    right.updated.localeCompare(left.updated),
  );
}

export function selectHomePosts(posts: readonly Article[]): {
  featuredPosts: Article[];
  recentPosts: Article[];
  latestBrief?: Article;
} {
  const sortedPosts = sortArticles(posts);
  const featuredPosts = sortedPosts.filter((post) => post.featured).slice(0, 3);
  const featuredSlugs = new Set(featuredPosts.map((post) => post.slug));

  return {
    featuredPosts,
    recentPosts: sortedPosts
      .filter((post) => !featuredSlugs.has(post.slug))
      .slice(0, 3),
    latestBrief: sortedPosts.find((post) => post.kind === "meta-brief"),
  };
}

export function filterPosts(
  posts: readonly Article[],
  query: string,
  kind: ArticleKind | "all",
): Article[] {
  const normalizedQuery = query.trim().toLowerCase();
  return sortArticles(posts).filter((post) => {
    const matchesKind = kind === "all" || post.kind === kind;
    const haystack = [
      post.title,
      post.excerpt,
      post.kind,
      post.format,
      ...post.tags,
    ]
      .join(" ")
      .toLowerCase();
    return (
      matchesKind && (!normalizedQuery || haystack.includes(normalizedQuery))
    );
  });
}

export function selectRelatedArticles(
  article: Article,
  posts: readonly Article[],
): Article[] {
  return posts
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      candidate,
      relevance: candidate.tags.filter((tag) => article.tags.includes(tag))
        .length,
    }))
    .sort(
      (left, right) =>
        right.relevance - left.relevance ||
        right.candidate.updated.localeCompare(left.candidate.updated),
    )
    .slice(0, 2)
    .map(({ candidate }) => candidate);
}
