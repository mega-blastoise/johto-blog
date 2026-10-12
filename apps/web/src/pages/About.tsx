import { memo } from "react";

import { Protocol } from "@/components/Protocol";
import { pipeline } from "@/utils/pipeline";

function AboutPage() {
  return <Protocol />;
}

export default pipeline(memo)(AboutPage);
