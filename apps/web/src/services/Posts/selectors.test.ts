import { expect, test } from "bun:test";

import { filterPosts, selectRelatedArticles } from "./selectors";

import type { Article } from "@prize-map/types";

const base = {
  counters: [],
  featured: false,
  format: "standard",
  matchups: [],
  visible: true,
} as const;

const posts: Article[] = [
  {
    ...base,
    body: "Alpha body",
    date: "2026-10-01",
    deck: { archetype: "alpha", version: "v1" },
    excerpt: "Alpha excerpt",
    kind: "deck-build",
    slug: "alpha",
    tags: ["testing", "alpha"],
    title: "Alpha build",
    updated: "2026-10-01",
  },
  {
    ...base,
    body: "Beta body",
    date: "2026-10-02",
    excerpt: "Beta excerpt",
    kind: "set-release",
    slug: "beta",
    tags: ["testing", "beta"],
    title: "Beta set watch",
    updated: "2026-10-02",
  },
];

test("filters the journal by text and article kind", () => {
  expect(
    filterPosts(posts, "set watch", "all").map((post) => post.slug),
  ).toEqual(["beta"]);
  expect(filterPosts(posts, "", "deck-build").map((post) => post.slug)).toEqual(
    ["alpha"],
  );
});

test("ranks related articles by shared editorial tags", () => {
  expect(
    selectRelatedArticles(posts[0]!, posts).map((post) => post.slug),
  ).toEqual(["beta"]);
});
