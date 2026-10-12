export const articleKinds = [
  "deck-report",
  "meta-brief",
  "tournament-log",
  "tech-note",
  "process",
] as const;

export type ArticleKind = (typeof articleKinds)[number];

export interface DeckContext {
  archetype: string;
  version: string;
  event?: string;
  record?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated: string;
  kind: ArticleKind;
  format: "standard" | "expanded" | "mixed";
  tags: readonly string[];
  featured: boolean;
  visible: boolean;
  deck?: DeckContext;
  body: string;
}
