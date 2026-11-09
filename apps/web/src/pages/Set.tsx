import { memo } from "react";

import { SetDetail } from "@/components/SetDetail";
import { pipeline } from "@/utils/pipeline";

function SetPage() {
  return <SetDetail />;
}

export default pipeline(memo)(SetPage);
