import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import SeasonMapView from "./View";

import type { SeasonMapProps } from "./types";

function SeasonMap(props: SeasonMapProps) {
  return <SeasonMapView {...props} />;
}

export default pipeline(memo)(SeasonMap);
