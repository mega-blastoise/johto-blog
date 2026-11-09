import { memo } from "react";

import { Posts } from "@/components/Posts";
import { pipeline } from "@/utils/pipeline";

function JournalPage() {
  return <Posts />;
}

export default pipeline(memo)(JournalPage);
