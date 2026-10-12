import { memo } from "react";

import { Home } from "@/components/Home";
import { pipeline } from "@/utils/pipeline";

function HomePage() {
  return <Home />;
}

export default pipeline(memo)(HomePage);
