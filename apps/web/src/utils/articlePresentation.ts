import type {
  Article,
  ArticleKind,
  EventTier,
  GameFormat,
} from "@prize-map/types";

import copy from "@/content/en.json";

export function articlePath(slug: string): string {
  return `/journal/${slug}/`;
}

export function deckPath(slug: string): string {
  return `/decks/${slug}/`;
}

export function setPath(code: string): string {
  return `/sets/${code.toLowerCase()}/`;
}

export function eventPath(slug: string): string {
  return `/events/${slug}/`;
}

export function formatArticleDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** "Nov 14" when both days share a month, "Nov 30 – Dec 1" when they don't. */
export function formatDateRange(starts: string, ends?: string): string {
  if (!ends || ends === starts) return formatArticleDate(starts);
  const short = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return `${short.format(new Date(`${starts}T00:00:00Z`))} – ${formatArticleDate(ends)}`;
}

export function articleKindLabel(kind: ArticleKind): string {
  return copy.articleKinds[kind];
}

export function formatLabel(article: Article | { format: GameFormat }): string {
  return copy.formats[article.format];
}

export function eventTierLabel(tier: EventTier): string {
  return copy.eventTiers[tier];
}
