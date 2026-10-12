import type { QueryClient } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

export interface BrowserDataLayerProps {
  client: QueryClient;
}

export interface DataLayerProps extends PropsWithChildren {
  browser: BrowserDataLayerProps;
}
