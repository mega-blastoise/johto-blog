import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import UnownWordView from "./View";

import type { UnownWordProps } from "./types";

function UnownWord(props: UnownWordProps) {
  return <UnownWordView {...props} />;
}

export default pipeline(memo)(UnownWord);
