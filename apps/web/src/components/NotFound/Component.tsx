import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import NotFoundView from "./View";

function NotFound() {
  return <NotFoundView />;
}

export default pipeline(memo)(NotFound);
