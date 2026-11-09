/** The four things Prize Map publishes. Each one has its own section of the site. */
export const articleKinds = [
  "deck-build",
  "set-release",
  "rotation",
  "event",
] as const;

export type ArticleKind = (typeof articleKinds)[number];

export const gameFormats = ["standard", "expanded", "mixed"] as const;

export type GameFormat = (typeof gameFormats)[number];

export const matchupResults = ["favored", "even", "unfavored"] as const;

export type MatchupResult = (typeof matchupResults)[number];

/** Play! Pokémon event tiers, smallest to largest. */
export const eventTiers = [
  "league-challenge",
  "league-cup",
  "special-event",
  "regional",
  "international",
  "worlds",
] as const;

export type EventTier = (typeof eventTiers)[number];

export const decklistSectionKinds = ["pokemon", "trainer", "energy"] as const;

export type DecklistSectionKind = (typeof decklistSectionKinds)[number];

export interface DecklistCard {
  count: number;
  name: string;
  /** PTCG Live set code, e.g. "TWM". Absent for placeholder or hand-typed lines. */
  set?: string;
  number?: string;
}

export interface DecklistSection {
  kind: DecklistSectionKind;
  count: number;
  cards: readonly DecklistCard[];
}

export interface Decklist {
  sections: readonly DecklistSection[];
  total: number;
  /** The list exactly as pasted, ready to import back into PTCG Live. */
  export: string;
}

export interface DeckContext {
  /** Slug of an entry in data/decks.yaml. */
  archetype: string;
  version: string;
  event?: string;
  record?: string;
}

export interface Matchup {
  /** Slug of an entry in data/decks.yaml. */
  vs: string;
  result: MatchupResult;
  note?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated: string;
  kind: ArticleKind;
  format: GameFormat;
  tags: readonly string[];
  featured: boolean;
  visible: boolean;
  /** deck-build only. */
  deck?: DeckContext;
  /** deck-build only. */
  matchups: readonly Matchup[];
  /** deck-build only: slugs of decks that beat this one. */
  counters: readonly string[];
  /** deck-build only: parsed from the post's ```decklist block. */
  decklist?: Decklist;
  /** set-release only: code of an entry in data/sets.yaml. */
  set?: string;
  /** rotation only: season of an entry in data/rotations.yaml. */
  rotation?: number;
  /** event only: slug of an entry in data/events.yaml. */
  event?: string;
  body: string;
}

/** An archetype in the Deck Dex. Entries without a deck-build post show as unwritten. */
export interface DeckArchetype {
  slug: string;
  name: string;
  tier?: 1 | 2 | 3;
}

export interface CardSet {
  code: string;
  name: string;
  released: string;
  /** First day the set is legal for tournament play. */
  legal: string;
  regulationMark?: string;
}

export interface Rotation {
  season: number;
  /** First day the rotated format is in effect. */
  date: string;
  /** Regulation marks leaving Standard. */
  marks: readonly string[];
}

export interface CompetitiveEvent {
  slug: string;
  name: string;
  tier: EventTier;
  starts: string;
  ends?: string;
  format: Exclude<GameFormat, "mixed">;
  location: string;
  url?: string;
}
