import { memo } from "react";

import { Article } from "@/components/Article";
import { pipeline } from "@/utils/pipeline";

function PostPage() {
  return <Article />;
}

export default pipeline(memo)(PostPage);
