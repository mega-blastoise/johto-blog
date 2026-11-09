import type { Catalog } from "@/services/Catalog";

export interface DeckEntryViewProps {
  catalog: Catalog;
  archetype: string;
  today: string;
}
