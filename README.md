# Prize Map

> Competitive Pokémon Trading Card Game deck builds, set and rotation reads, and tournament prep.

Prize Map is a small, static, Markdown-first site organized around the decks. Every archetype has a Deck Dex page with its current list, matchups and build history. Set releases and rotation sit on one timeline, and the calendar tracks upcoming Regionals and Cups. It starts with authoring templates rather than unverified claims about a live format.

## Site map

| Route                             | What's there                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `/`                               | Top decks, the current format, latest posts, upcoming events                  |
| `/decks/` · `/decks/<archetype>/` | Deck Dex, and one entry per archetype built from its newest `deck-build` post |
| `/sets/` · `/sets/<code>/`        | Sets & Rotation timeline, set releases, rotation guides                       |
| `/events/` · `/events/<slug>/`    | Upcoming and past events, previews and reports                                |
| `/journal/` · `/journal/<slug>/`  | Every post, searchable. Old `/posts/…` links redirect here                    |
| `/about/`                         | About Prize Map                                                               |

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

## Authoring

Content lives in `packages/content-data/`:

```
posts/            # Markdown posts, one per file
data/decks.yaml   # Deck Dex archetypes (slug, name, optional tier 1-3)
data/sets.yaml    # Sets with release and tournament-legal dates
data/rotations.yaml
data/events.yaml  # The tournament calendar
```

Frontmatter is validated during every build, including unknown-key detection, so a typo never silently reaches the site. Cross-references are checked too: a deck slug, set code, rotation season or event slug that isn't in `data/` fails the build.

`kind` is one of `deck-build`, `set-release`, `rotation`, or `event`. Copy the matching `*-template.md` post to start.

### Deck builds

```md
---
title: "Dragapult ex v4: built for a Gardevoir room"
slug: dragapult-ex-v4
excerpt: The decision this post helps a player make.
date: 2026-11-02
updated: 2026-11-02
kind: deck-build
format: standard
tags: [dragapult]
deck:
  archetype: dragapult-ex # slug in data/decks.yaml
  version: v4
  event: League Cup testing # optional
  record: 7-2 # optional
matchups: # optional, each vs is a deck slug
  - vs: gardevoir-ex
    result: favored # favored | even | unfavored
    note: Spread takes Kirlia before it evolves.
counters: [gholdengo-ex] # optional deck slugs
---
```

Every deck build contains exactly one fenced `decklist` block holding a PTCG Live export pasted as is. The build checks that each section adds up and the deck is exactly 60 cards, and the page renders the list with a **Copy for Live** button.

The newest `deck-build` post for an archetype becomes its Deck Dex entry. Publish a new post for a new version so older lists stay in the build history. A build is flagged as possibly out of date once a set in `data/sets.yaml` becomes legal after its `updated` date.

### Sets, rotation and events

Link a `set-release` post to a set with `set: <code>`, a `rotation` post with `rotation: <season>`, and an `event` post with `event: <slug>`. Each field is only allowed on its own kind.

## Editorial rule

Every live meta post should include its format, source window, update date, confidence, and what would invalidate the conclusion. Keep deck versions immutable in their reports; publish a fresh note when the list changes meaningfully.

Pokémon and Pokémon Trading Card Game are trademarks of their respective owners. Prize Map is an independent fan publication.
