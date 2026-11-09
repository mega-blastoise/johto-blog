import { memo } from "react";

import { About } from "@/components/About";
import { pipeline } from "@/utils/pipeline";

function AboutPage() {
  return <About />;
}

export default pipeline(memo)(AboutPage);
