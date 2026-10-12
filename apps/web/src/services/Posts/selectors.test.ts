import { expect, test } from "bun:test";

import { filterPosts, selectRelatedArticles } from "./selectors";

import type { Article } from "@prize-map/types";

const posts: Article[] = [
  {
    body: "Alpha body",
    date: "2026-10-01",
    excerpt: "Alpha excerpt",
    featured: false,
    format: "standard",
    kind: "deck-report",
    slug: "alpha",
    tags: ["testing", "alpha"],
    title: "Alpha report",
    updated: "2026-10-01",
    visible: true,
  },
  {
    body: "Beta body",
    date: "2026-10-02",
    excerpt: "Beta excerpt",
    featured: false,
    format: "standard",
    kind: "meta-brief",
    slug: "beta",
    tags: ["testing", "beta"],
    title: "Beta brief",
    updated: "2026-10-02",
    visible: true,
  },
];

test("filters the journal by text and article kind", () => {
  expect(filterPosts(posts, "brief", "all").map((post) => post.slug)).toEqual([
    "beta",
  ]);
  expect(
    filterPosts(posts, "", "deck-report").map((post) => post.slug),
  ).toEqual(["alpha"]);
});

test("ranks related articles by shared editorial tags", () => {
  expect(
    selectRelatedArticles(posts[0]!, posts).map((post) => post.slug),
  ).toEqual(["beta"]);
});
