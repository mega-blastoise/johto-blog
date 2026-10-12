import type { Article, ArticleKind } from "@prize-map/types";

export type Route =
  | { page: "home" }
  | { page: "field" }
  | { page: "about" }
  | { page: "article"; slug: string }
  | { page: "not-found" };

export interface FeedFilters {
  query: string;
  kind: ArticleKind | "all";
}

export interface FeedState extends FeedFilters {
  posts: readonly Article[];
}
