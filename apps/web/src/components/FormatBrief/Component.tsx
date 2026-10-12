import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import FormatBriefView from "./View";

import type { FormatBriefProps } from "./types";

function FormatBrief(props: FormatBriefProps) {
  return <FormatBriefView {...props} />;
}

export default pipeline(memo)(FormatBrief);
