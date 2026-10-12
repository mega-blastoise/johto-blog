import type { Article, ArticleKind } from "@prize-map/types";

import copy from "@/content/en.json";

export function articlePath(slug: string): string {
  return `/posts/${slug}/`;
}

export function formatArticleDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function articleKindLabel(kind: ArticleKind): string {
  return copy.articleKinds[kind];
}

export function formatLabel(article: Article): string {
  return copy.formats[article.format];
}
