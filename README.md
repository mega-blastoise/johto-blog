# Prize Map

> A competitive Pokémon Trading Card Game journal for deck reports, matchup plans, and timestamped format reads.

Prize Map is a small, static, Markdown-first site for players who need their testing notes to remain useful after the event. It deliberately starts with authoring templates rather than unverified claims about a live format.

## Structure

```
prize-map/
├── apps/
│   └── web/                 # Static React site and static-route builder
├── packages/
│   ├── content/             # Strict frontmatter contract and parser
│   ├── content-data/        # Source Markdown and generated content manifest
│   └── types/               # Shared public domain types
├── .github/workflows/       # Sanity-check CI and tag-driven AWS release
└── turbo.json
```

Every package compiles to `dist/` and exports built JavaScript plus declarations. No consumer resolves package TypeScript source.

## Production deployment

Pushing a `v*` tag releases `apps/web/dist` to a private S3 bucket behind CloudFront, using short-lived GitHub OIDC credentials, and publishes a matching GitHub Release. The AWS resources are created by hand in the console; follow the [AWS production deployment guide](docs/deployment.md) to set them up and activate the `production` GitHub Environment.

```bash
git tag v0.2.0
git push origin v0.2.0
```

## Local development

```bash
bun install
bun run build
bun run dev
```

The local site serves at `http://localhost:3000`. A normal production check is:

```bash
bun run check-types
bun run lint
bun run test
bun run build
```

## Authoring a post

Create a Markdown file in `packages/content-data/posts/`. Frontmatter is validated during every build, including unknown-key detection—an accidental typo does not silently reach the site.

```md
---
title: Your report title
slug: your-report-title
excerpt: The decision this post helps a player make.
date: 2026-10-12
updated: 2026-10-12
kind: deck-report
format: standard
tags: [testing, deck-report]
featured: false
visible: true
deck:
  archetype: Your archetype
  version: v1.3
  event: League Cup testing
  record: 7-2
---

## The deck's job

Write the article here.
```

`kind` is one of `deck-report`, `meta-brief`, `tournament-log`, `tech-note`, or `process`. The starter templates model a concise way to write reports without pretending that a metagame conclusion is current forever.

## Editorial rule

Every live meta post should include its format, source window, update date, confidence, and what would invalidate the conclusion. Keep deck versions immutable in their reports; publish a fresh note when the list changes meaningfully.

Pokémon and Pokémon Trading Card Game are trademarks of their respective owners. Prize Map is an independent fan publication.
