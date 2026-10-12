import type { ComponentType } from "react";
import type { RouteObject } from "react-router";

type PageModule = { default: ComponentType };

export function createLazyRoute(
  loadPage: () => Promise<PageModule>,
): RouteObject["lazy"] {
  return async () => ({ Component: (await loadPage()).default });
}
