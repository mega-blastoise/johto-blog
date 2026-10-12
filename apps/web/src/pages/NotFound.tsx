import { memo } from "react";

import { NotFound } from "@/components/NotFound";
import { pipeline } from "@/utils/pipeline";

function NotFoundPage() {
  return <NotFound />;
}

export default pipeline(memo)(NotFoundPage);
