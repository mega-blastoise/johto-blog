import { decks, events, posts, rotations, sets } from "@prize-map/content-data";

import { sortArticles } from "@/services/Posts";

import type {
  Article,
  CardSet,
  CompetitiveEvent,
  DeckArchetype,
  Rotation,
} from "@prize-map/types";

export interface Catalog {
  posts: Article[];
  decks: readonly DeckArchetype[];
  sets: readonly CardSet[];
  rotations: readonly Rotation[];
  events: readonly CompetitiveEvent[];
}

class CatalogService {
  async fetchCatalog(): Promise<Catalog> {
    return { posts: sortArticles(posts), decks, sets, rotations, events };
  }
}

export default CatalogService;
