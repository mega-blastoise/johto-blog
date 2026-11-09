---
title: "Deck Build Template: Strategy, Matchups, and the Full Sixty"
slug: deck-build-template
excerpt: The structure every deck build follows, from the one-line game plan to a 60-card list you can import straight into PTCG Live.
date: 2026-11-02
updated: 2026-11-02
kind: deck-build
format: standard
tags: [deck-build, template]
featured: true
visible: true
deck:
  archetype: template-deck
  version: v1
  event: "[Event or testing window]"
  record: "[Record, if applicable]"
matchups:
  - vs: template-favored
    result: favored
    note: "[The line that wins this matchup, in one sentence]"
  - vs: template-counter
    result: unfavored
    note: "[What they do that you can't answer]"
counters: [template-counter]
---

## Snapshot

One paragraph a reader can use in ten seconds: what the deck does, the format it was built for, and whether this version is the one to register. The deck, version, matchups and counters live in the frontmatter, so the Deck Dex page and the matchup table update themselves.

## Strategy

State the deck's job in two or three sentences. Name the main attacker, the support engine, and the prize trade the deck is trying to force. Explain the constraint that shaped the sixty instead of describing every card.

## Play patterns

The sequences that win games, in the order you make them:

1. **Turn 1:** [the setup you are fishing for, and the backup if you miss it]
2. **Turn 2:** [the first attack or the evolution you must hit]
3. **Midgame:** [how you map the next four prizes]
4. **Closing:** [the last two prizes, and what you hold back for them]

Note the common misplays too: the resource you burn too early, or the target you shouldn't take.

## What it does well against

For each favored matchup, say why the deck wins it: the prize map, who you want going first, and the card that swings the game. Keep tested lines separate from theory you haven't played yet.

## Counters

The decks and cards that beat this list, and what (if anything) you can do about them. If you're on the losing side of a counter, say so: a reader deciding what to register needs to know.

## The list

Paste the PTCG Live export exactly as it comes out of the game, inside a `decklist` block. The build checks that every section adds up and the deck is exactly 60 cards, and the page gets a **Copy for Live** button.

```decklist
Pokémon: 14
4 [Basic attacker]
3 [Stage 1]
3 [Main attacker]
2 [Draw support Pokémon]
2 [Utility Pokémon]

Trainer: 36
4 [Draw Supporter]
3 [Gust Supporter]
4 [Ball search]
4 [Pokémon search]
4 [Evolution search]
3 [Switching]
2 [Energy recovery]
4 [Consistency Item]
2 [Tech Item]
2 [Tool]
2 [Tech Tool]
2 [Stadium]

Energy: 10
10 [Basic Energy]

Total Cards: 60
```

## Change log

- **In:** [card]: [the problem it solves]
- **Out:** [card]: [why it lost the slot]
- **Still unresolved:** [one question to test next]
