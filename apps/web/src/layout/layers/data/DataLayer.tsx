import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import BrowserDataLayer from "./browser/BrowserDataLayer";

import type { DataLayerProps } from "./types";

function DataLayer({ browser, children }: DataLayerProps) {
  return (
    <BrowserDataLayer client={browser.client}>{children}</BrowserDataLayer>
  );
}

export default pipeline(memo)(DataLayer) as ReturnType<
  typeof memo<typeof DataLayer>
>;
