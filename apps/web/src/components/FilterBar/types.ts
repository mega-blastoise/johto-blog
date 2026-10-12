import type { ArticleKind } from "@prize-map/types";

export interface FilterBarProps {
  kind: ArticleKind | "all";
  onKindChange: (kind: ArticleKind | "all") => void;
  onQueryChange: (query: string) => void;
  query: string;
}
