import { describe, expect, test } from "bun:test";

import {
  parseArticle,
  parseDecklist,
  parseDecks,
  parseEvents,
  parseSets,
  validateCatalog,
} from "./index";

const legalList = `Pokémon: 14
4 Dreepy TWM 128
4 Drakloak TWM 129
3 Dragapult ex TWM 130
3 [Utility Pokémon]

Trainer: 36
4 Arven SVI 166
32 [Trainer slots]

Energy: 10
10 [Basic Energy]

Total Cards: 60`;

function deckPost(extra = "", body = "```decklist\n" + legalList + "\n```") {
  return `---
title: Test Build
slug: test-build
excerpt: A concise build.
date: 2026-10-12
updated: 2026-10-12
kind: deck-build
format: standard
tags: [testing]
deck:
  archetype: dragapult-ex
  version: v1
${extra}---

## The list

${body}
`;
}

describe("parseDecklist", () => {
  test("reads a PTCG Live export into sections", () => {
    const list = parseDecklist(legalList);
    expect(list.total).toBe(60);
    expect(
      list.sections.map((section) => [section.kind, section.count]),
    ).toEqual([
      ["pokemon", 14],
      ["trainer", 36],
      ["energy", 10],
    ]);
    expect(list.sections[0]?.cards[0]).toEqual({
      count: 4,
      name: "Dreepy",
      set: "TWM",
      number: "128",
    });
    expect(list.sections[0]?.cards[3]).toEqual({
      count: 3,
      name: "[Utility Pokémon]",
    });
    expect(list.export).toStartWith("Pokémon: 14");
  });

  test("rejects a section whose header disagrees with its cards", () => {
    expect(() =>
      parseDecklist(legalList.replace("Pokémon: 14", "Pokémon: 13")),
    ).toThrow("pokemon header says 13 but the cards add up to 14");
  });

  test("rejects a list that is not 60 cards", () => {
    const short = legalList
      .replace("Energy: 10", "Energy: 9")
      .replace("10 [Basic Energy]", "9 [Basic Energy]")
      .replace("Total Cards: 60", "");
    expect(() => parseDecklist(short)).toThrow("decklist has 59 cards");
  });

  test("rejects cards before any section header", () => {
    expect(() => parseDecklist("4 Dreepy TWM 128")).toThrow("before a");
  });
});

describe("parseArticle", () => {
  test("parses a deck build and its decklist block", () => {
    const { article } = parseArticle(
      deckPost(
        "matchups:\n  - vs: gardevoir-ex\n    result: favored\ncounters: [gholdengo-ex]\n",
      ),
    );
    expect(article.kind).toBe("deck-build");
    expect(article.decklist?.total).toBe(60);
    expect(article.matchups).toEqual([
      { vs: "gardevoir-ex", result: "favored" },
    ]);
    expect(article.counters).toEqual(["gholdengo-ex"]);
  });

  test("requires exactly one decklist on a deck build", () => {
    expect(() => parseArticle(deckPost("", "No list here."))).toThrow(
      "exactly one",
    );
  });

  test("rejects deck fields on other kinds", () => {
    expect(() =>
      parseArticle(`---
title: Set Watch
slug: set-watch
excerpt: New cards.
date: 2026-10-12
updated: 2026-10-12
kind: set-release
format: standard
tags: [sets]
counters: [gholdengo-ex]
---

Body.
`),
    ).toThrow('"counters" is only allowed on deck-build posts');
  });

  test("rejects a frontmatter typo instead of silently accepting it", () => {
    expect(() => parseArticle(deckPost("visibile: true\n"))).toThrow(
      "invalid frontmatter",
    );
  });
});

describe("registries", () => {
  test("treat a comment-only file as empty", () => {
    expect(parseSets("# nothing yet\n")).toEqual([]);
  });

  test("sort sets by legal date and events by start date", () => {
    const sets = parseSets(`
- { code: BBB, name: Second, released: 2026-03-01, legal: 2026-03-20 }
- { code: AAA, name: First, released: 2026-01-01, legal: 2026-01-20 }
`);
    expect(sets.map((set) => set.code)).toEqual(["AAA", "BBB"]);
    const events = parseEvents(`
- { slug: late, name: Late, tier: regional, starts: 2026-12-01, format: standard, location: A }
- { slug: early, name: Early, tier: league-cup, starts: 2026-11-01, format: standard, location: B }
`);
    expect(events.map((event) => event.slug)).toEqual(["early", "late"]);
  });

  test("reject duplicate slugs", () => {
    expect(() =>
      parseDecks("- { slug: a, name: A }\n- { slug: a, name: Again }\n"),
    ).toThrow('duplicate entry "a"');
  });
});

describe("validateCatalog", () => {
  test("reports every reference that is not in a registry", () => {
    const { article } = parseArticle(
      deckPost("matchups:\n  - vs: gardevoir-ex\n    result: favored\n"),
    );
    const errors = validateCatalog({
      posts: [article],
      decks: [{ slug: "dragapult-ex", name: "Dragapult ex" }],
      sets: [],
      rotations: [],
      events: [],
    });
    expect(errors).toEqual([
      'test-build: matchups.vs "gardevoir-ex" is not in data/decks.yaml',
    ]);
  });
});
