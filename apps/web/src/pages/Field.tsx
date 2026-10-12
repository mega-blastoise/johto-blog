import { memo } from "react";

import { FieldNotes } from "@/components/FieldNotes";
import { pipeline } from "@/utils/pipeline";

function FieldPage() {
  return <FieldNotes />;
}

export default pipeline(memo)(FieldPage);
