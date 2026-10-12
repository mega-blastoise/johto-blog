import { expect, test } from "bun:test";

import { parseArticle } from "./index";

test("parses a strictly-shaped competitive article", () => {
  const parsed = parseArticle(`---
title: Test Report
slug: test-report
excerpt: A concise report.
date: 2026-10-12
updated: 2026-10-12
kind: deck-report
format: standard
tags: [testing]
---
\n# Match notes\n`);

  expect(parsed.article.slug).toBe("test-report");
  expect(parsed.article.kind).toBe("deck-report");
});

test("rejects a frontmatter typo instead of silently accepting it", () => {
  expect(() =>
    parseArticle(`---
title: Test Report
slug: test-report
excerpt: A concise report.
date: 2026-10-12
updated: 2026-10-12
kind: deck-report
format: standard
tags: [testing]
visibile: true
---
\n# Match notes\n`),
  ).toThrow("invalid frontmatter");
});
