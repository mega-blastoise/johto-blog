import type { Catalog } from "@/services/Catalog";

export interface HomeViewProps {
  catalog: Catalog;
  today: string;
}
