import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import EnergySymbolView from "./View";

import type { EnergySymbolProps } from "./types";

function EnergySymbol(props: EnergySymbolProps) {
  return <EnergySymbolView {...props} />;
}

export default pipeline(memo)(EnergySymbol);
