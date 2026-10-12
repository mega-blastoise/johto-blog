import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import FooterView from "./View";

function Footer() {
  return <FooterView />;
}

export default pipeline(memo)(Footer);
