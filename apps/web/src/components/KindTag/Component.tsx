import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import KindTagView from "./View";

import type { KindTagProps } from "./types";

function KindTag(props: KindTagProps) {
  return <KindTagView {...props} />;
}

export default pipeline(memo)(KindTag);
