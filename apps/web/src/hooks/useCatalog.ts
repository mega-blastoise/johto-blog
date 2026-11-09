import { useSuspenseQuery } from "@tanstack/react-query";

import CatalogService, { type Catalog } from "@/services/Catalog";

import type { UseSuspenseQueryResult } from "@tanstack/react-query";

const catalogService = new CatalogService();

export const catalogQueryKey = ["catalog"] as const;

export function useGetCatalog(): UseSuspenseQueryResult<Catalog, Error> {
  return useSuspenseQuery({
    queryKey: catalogQueryKey,
    queryFn: () => catalogService.fetchCatalog(),
  });
}
