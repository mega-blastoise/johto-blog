import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import PrizeTrackView from "./View";

import type { PrizeTrackProps } from "./types";

function PrizeTrack(props: PrizeTrackProps) {
  return <PrizeTrackView {...props} />;
}

export default pipeline(memo)(PrizeTrack);
