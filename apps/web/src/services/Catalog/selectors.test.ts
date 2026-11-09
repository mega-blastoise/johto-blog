import { describe, expect, test } from "bun:test";

import {
  selectBuildsBeforeSet,
  selectDeckEntries,
  selectDeckEntry,
  selectNewerSet,
  selectNextSet,
  selectPastEvents,
  selectSetLegalOn,
  selectTimeline,
  selectTopDecks,
  selectUpcomingEvents,
} from "./selectors";

import type {
  Article,
  CardSet,
  CompetitiveEvent,
  DeckArchetype,
} from "@prize-map/types";

const decks: DeckArchetype[] = [
  { slug: "alpha", name: "Alpha ex", tier: 2 },
  { slug: "beta", name: "Beta ex", tier: 1 },
  { slug: "gamma", name: "Gamma ex" },
];

function build(
  slug: string,
  archetype: string,
  updated: string,
  matchups: Article["matchups"] = [],
): Article {
  return {
    body: "Body",
    counters: [],
    date: updated,
    deck: { archetype, version: slug },
    excerpt: "Excerpt",
    featured: false,
    format: "standard",
    kind: "deck-build",
    matchups,
    slug,
    tags: ["test"],
    title: slug,
    updated,
    visible: true,
  };
}

const posts = [
  build("alpha-v1", "alpha", "2026-08-01"),
  build("alpha-v2", "alpha", "2026-10-01", [{ vs: "beta", result: "favored" }]),
  build("beta-v1", "beta", "2026-09-01", [
    { vs: "alpha", result: "unfavored" },
  ]),
];

const sets: CardSet[] = [
  { code: "AAA", name: "First", released: "2026-06-01", legal: "2026-06-20" },
  { code: "BBB", name: "Second", released: "2026-09-01", legal: "2026-09-20" },
  { code: "CCC", name: "Third", released: "2026-12-01", legal: "2026-12-20" },
];

describe("deck entries", () => {
  test("number entries in registry order and put the newest build first", () => {
    const entries = selectDeckEntries(decks, posts);
    expect(entries.map((entry) => [entry.number, entry.latest?.slug])).toEqual([
      [1, "alpha-v2"],
      [2, "beta-v1"],
      [3, undefined],
    ]);
    expect(entries[0]?.builds.map((post) => post.slug)).toEqual([
      "alpha-v2",
      "alpha-v1",
    ]);
  });

  test("rank top decks by tier and skip unbuilt archetypes", () => {
    const top = selectTopDecks(selectDeckEntries(decks, posts));
    expect(top.map((entry) => entry.deck.slug)).toEqual(["beta", "alpha"]);
  });

  test("collect what other decks' latest builds say about an archetype", () => {
    const entry = selectDeckEntry("alpha", decks, posts);
    expect(entry?.opposingViews).toEqual([
      {
        deck: decks[1]!,
        post: posts[2]!,
        matchup: { vs: "alpha", result: "unfavored" },
      },
    ]);
    expect(selectDeckEntry("missing", decks, posts)).toBeNull();
  });
});

describe("format dates", () => {
  test("find the newest legal set and the next one", () => {
    expect(selectSetLegalOn(sets, "2026-11-02")?.code).toBe("BBB");
    expect(selectSetLegalOn(sets, "2026-01-01")).toBeUndefined();
    expect(selectNextSet(sets, "2026-11-02")?.code).toBe("CCC");
  });

  test("flag a deck build written before the newest legal set", () => {
    expect(selectNewerSet(posts[0]!, sets, "2026-11-02")?.code).toBe("BBB");
    expect(selectNewerSet(posts[1]!, sets, "2026-11-02")).toBeUndefined();
    // A set that is announced but not yet legal does not make a list stale.
    expect(selectNewerSet(posts[1]!, sets, "2026-12-19")).toBeUndefined();
  });

  test("list decks whose latest build predates a legal set", () => {
    const entries = selectDeckEntries(decks, posts);
    expect(
      selectBuildsBeforeSet(entries, sets[1]!, "2026-11-02").map(
        (e) => e.deck.slug,
      ),
    ).toEqual(["beta"]);
    expect(selectBuildsBeforeSet(entries, sets[2]!, "2026-11-02")).toEqual([]);
  });

  test("place today on the timeline between stops", () => {
    const stops = selectTimeline(
      sets,
      [{ season: 2027, date: "2026-06-20", marks: ["G"] }],
      "2026-11-02",
    );
    expect(stops.map((stop) => stop.kind)).toEqual([
      "rotation",
      "set",
      "set",
      "today",
      "set",
    ]);
    expect(selectTimeline([], [], "2026-11-02")).toEqual([]);
  });
});

describe("events", () => {
  const events: CompetitiveEvent[] = [
    {
      slug: "old",
      name: "Old",
      tier: "league-cup",
      starts: "2026-10-01",
      format: "standard",
      location: "A",
    },
    {
      slug: "now",
      name: "Now",
      tier: "regional",
      starts: "2026-11-01",
      ends: "2026-11-03",
      format: "standard",
      location: "B",
    },
    {
      slug: "soon",
      name: "Soon",
      tier: "regional",
      starts: "2026-11-14",
      format: "standard",
      location: "C",
    },
  ];

  test("keep an event upcoming until its last day", () => {
    expect(
      selectUpcomingEvents(events, "2026-11-02").map((event) => event.slug),
    ).toEqual(["now", "soon"]);
    expect(
      selectPastEvents(events, "2026-11-02").map((event) => event.slug),
    ).toEqual(["old"]);
  });
});
