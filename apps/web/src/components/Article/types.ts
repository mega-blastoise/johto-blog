import type { Article } from "@prize-map/types";
export interface ArticleViewProps {
  article: Article | null;
  relatedPosts: Article[];
}
