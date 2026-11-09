import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import AboutView from "./View";

function About() {
  return <AboutView />;
}

export default pipeline(memo)(About);
