import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import ProtocolView from "./View";

function Protocol() {
  return <ProtocolView />;
}

export default pipeline(memo)(Protocol);
