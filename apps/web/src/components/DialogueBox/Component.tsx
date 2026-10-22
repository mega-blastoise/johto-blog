import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import DialogueBoxView from "./View";

import type { DialogueBoxProps } from "./types";

function DialogueBox(props: DialogueBoxProps) {
  return <DialogueBoxView {...props} />;
}

export default pipeline(memo)(DialogueBox);
