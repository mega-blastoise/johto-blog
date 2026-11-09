import type {
  Article,
  CardSet,
  CompetitiveEvent,
  DeckArchetype,
  Rotation,
} from "@prize-map/types";

export interface ContentCatalog {
  posts: readonly Article[];
  decks: readonly DeckArchetype[];
  sets: readonly CardSet[];
  rotations: readonly Rotation[];
  events: readonly CompetitiveEvent[];
}

/**
 * Checks every cross-reference between posts and the data registries, so a
 * typo in a deck slug or set code fails the build instead of rendering a dead link.
 */
export function validateCatalog(catalog: ContentCatalog): string[] {
  const deckSlugs = new Set(catalog.decks.map((deck) => deck.slug));
  const setCodes = new Set(catalog.sets.map((set) => set.code));
  const seasons = new Set(catalog.rotations.map((rotation) => rotation.season));
  const eventSlugs = new Set(catalog.events.map((event) => event.slug));
  const errors: string[] = [];
  const postSlugs = new Set<string>();

  const missingDeck = (post: Article, field: string, slug: string) => {
    if (!deckSlugs.has(slug)) {
      errors.push(`${post.slug}: ${field} "${slug}" is not in data/decks.yaml`);
    }
  };

  for (const post of catalog.posts) {
    if (postSlugs.has(post.slug))
      errors.push(`duplicate post slug "${post.slug}"`);
    postSlugs.add(post.slug);

    if (post.deck) missingDeck(post, "deck.archetype", post.deck.archetype);
    for (const matchup of post.matchups)
      missingDeck(post, "matchups.vs", matchup.vs);
    for (const counter of post.counters) missingDeck(post, "counters", counter);

    if (post.set !== undefined && !setCodes.has(post.set)) {
      errors.push(`${post.slug}: set "${post.set}" is not in data/sets.yaml`);
    }
    if (post.rotation !== undefined && !seasons.has(post.rotation)) {
      errors.push(
        `${post.slug}: rotation ${post.rotation} is not in data/rotations.yaml`,
      );
    }
    if (post.event !== undefined && !eventSlugs.has(post.event)) {
      errors.push(
        `${post.slug}: event "${post.event}" is not in data/events.yaml`,
      );
    }
  }

  return errors;
}
