import type { Catalog } from "@/services/Catalog";

export interface EventDetailViewProps {
  catalog: Catalog;
  slug: string;
  today: string;
}
