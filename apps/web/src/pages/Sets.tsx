import { memo } from "react";

import { SetsRotation } from "@/components/SetsRotation";
import { pipeline } from "@/utils/pipeline";

function SetsPage() {
  return <SetsRotation />;
}

export default pipeline(memo)(SetsPage);
