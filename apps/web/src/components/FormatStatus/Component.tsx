import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import FormatStatusView from "./View";

import type { FormatStatusProps } from "./types";

function FormatStatus(props: FormatStatusProps) {
  return <FormatStatusView {...props} />;
}

export default pipeline(memo)(FormatStatus);
