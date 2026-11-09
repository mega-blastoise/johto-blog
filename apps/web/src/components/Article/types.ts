import type { Catalog } from "@/services/Catalog";
import type { Article } from "@prize-map/types";

export interface ArticleViewProps {
  article: Article | null;
  relatedPosts: Article[];
  catalog: Catalog;
  today: string;
}
