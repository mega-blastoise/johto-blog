import type { Catalog } from "@/services/Catalog";

export interface SetDetailViewProps {
  catalog: Catalog;
  code: string;
  today: string;
}
