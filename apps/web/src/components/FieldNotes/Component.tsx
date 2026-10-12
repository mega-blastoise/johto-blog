import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import FieldNotesView from "./View";

function FieldNotes() {
  return <FieldNotesView />;
}

export default pipeline(memo)(FieldNotes);
