import type {
  Article,
  CardSet,
  CompetitiveEvent,
  DeckArchetype,
  Matchup,
  Rotation,
} from "@prize-map/types";

export interface DeckEntry {
  deck: DeckArchetype;
  /** Dex number: position in data/decks.yaml, starting at 1. */
  number: number;
  /** Every deck-build post for this archetype, newest first. */
  builds: Article[];
  latest?: Article;
}

export interface OpposingView {
  deck: DeckArchetype;
  post: Article;
  matchup: Matchup;
}

export interface DeckEntryDetail extends DeckEntry {
  /** How the latest builds of other decks rate against this one. */
  opposingViews: OpposingView[];
}

function newestFirst(left: Article, right: Article): number {
  return (
    right.updated.localeCompare(left.updated) ||
    right.date.localeCompare(left.date)
  );
}

export function selectDeckEntries(
  decks: readonly DeckArchetype[],
  posts: readonly Article[],
): DeckEntry[] {
  return decks.map((deck, index) => {
    const builds = posts
      .filter(
        (post) =>
          post.kind === "deck-build" && post.deck?.archetype === deck.slug,
      )
      .sort(newestFirst);
    return { deck, number: index + 1, builds, latest: builds[0] };
  });
}

/** Built decks only, strongest tier first, then the most recently updated. */
export function selectTopDecks(
  entries: readonly DeckEntry[],
  limit = 3,
): DeckEntry[] {
  return entries
    .filter(
      (entry): entry is DeckEntry & { latest: Article } =>
        entry.latest !== undefined,
    )
    .sort(
      (left, right) =>
        (left.deck.tier ?? 4) - (right.deck.tier ?? 4) ||
        right.latest.updated.localeCompare(left.latest.updated),
    )
    .slice(0, limit);
}

export function selectDeckEntry(
  slug: string,
  decks: readonly DeckArchetype[],
  posts: readonly Article[],
): DeckEntryDetail | null {
  const entries = selectDeckEntries(decks, posts);
  const entry = entries.find((candidate) => candidate.deck.slug === slug);
  if (!entry) return null;

  const opposingViews = entries.flatMap((other) => {
    if (other.deck.slug === slug || !other.latest) return [];
    const post = other.latest;
    return post.matchups
      .filter((matchup) => matchup.vs === slug)
      .map((matchup) => ({ deck: other.deck, post, matchup }));
  });

  return { ...entry, opposingViews };
}

/** The newest set legal on or before a date. */
export function selectSetLegalOn(
  sets: readonly CardSet[],
  date: string,
): CardSet | undefined {
  return sets.filter((set) => set.legal <= date).at(-1);
}

export function selectNextSet(
  sets: readonly CardSet[],
  today: string,
): CardSet | undefined {
  return sets.find((set) => set.legal > today);
}

/**
 * For a deck build, the newest set that became legal after the post was last
 * updated. A result means the list was written for an older format.
 */
export function selectNewerSet(
  article: Article,
  sets: readonly CardSet[],
  today: string,
): CardSet | undefined {
  if (article.kind !== "deck-build") return undefined;
  const newest = selectSetLegalOn(sets, today);
  return newest && newest.legal > article.updated ? newest : undefined;
}

export function selectUpcomingEvents(
  events: readonly CompetitiveEvent[],
  today: string,
): CompetitiveEvent[] {
  return events.filter((event) => (event.ends ?? event.starts) >= today);
}

/** Most recent first. */
export function selectPastEvents(
  events: readonly CompetitiveEvent[],
  today: string,
): CompetitiveEvent[] {
  return events
    .filter((event) => (event.ends ?? event.starts) < today)
    .reverse();
}

export type TimelineStop =
  | { kind: "set"; date: string; set: CardSet }
  | { kind: "rotation"; date: string; rotation: Rotation }
  | { kind: "today"; date: string };

/** Set legal dates and rotations in date order, with a marker for today. */
export function selectTimeline(
  sets: readonly CardSet[],
  rotations: readonly Rotation[],
  today: string,
): TimelineStop[] {
  const stops: TimelineStop[] = [
    ...sets.map((set) => ({ kind: "set" as const, date: set.legal, set })),
    ...rotations.map((rotation) => ({
      kind: "rotation" as const,
      date: rotation.date,
      rotation,
    })),
  ];
  if (stops.length === 0) return [];
  // Same-day ties: rotation, then sets, then today, so "today" reads as after both.
  const order = { rotation: 0, set: 1, today: 2 };
  return [...stops, { kind: "today" as const, date: today }].sort(
    (left, right) =>
      left.date.localeCompare(right.date) ||
      order[left.kind] - order[right.kind],
  );
}

export function findSet(
  sets: readonly CardSet[],
  code: string,
): CardSet | undefined {
  const normalized = code.toUpperCase();
  return sets.find((set) => set.code === normalized);
}

export function postsForSet(
  posts: readonly Article[],
  code: string,
): Article[] {
  return posts.filter((post) => post.set === code);
}

export function postsForEvent(
  posts: readonly Article[],
  slug: string,
): Article[] {
  return posts.filter((post) => post.event === slug);
}

/** Decks whose latest build predates a set that is now legal. */
export function selectBuildsBeforeSet(
  entries: readonly DeckEntry[],
  set: CardSet,
  today: string,
): DeckEntry[] {
  if (set.legal > today) return [];
  return entries.filter(
    (entry) => entry.latest && entry.latest.updated < set.legal,
  );
}
