import type { Article, ArticleKind } from "@prize-map/types";

export const kindLabels: Record<ArticleKind, string> = {
  "deck-report": "Deck report",
  "meta-brief": "Meta brief",
  "tournament-log": "Tournament log",
  "tech-note": "Tech note",
  process: "Process",
};

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function relatedArticles(
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
      (a, b) =>
        b.relevance - a.relevance ||
        b.candidate.updated.localeCompare(a.candidate.updated),
    )
    .slice(0, 2)
    .map(({ candidate }) => candidate);
}
