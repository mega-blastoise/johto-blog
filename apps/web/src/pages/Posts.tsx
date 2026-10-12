import { memo } from "react";

import { Posts } from "@/components/Posts";
import { pipeline } from "@/utils/pipeline";

function PostsPage() {
  return <Posts />;
}

export default pipeline(memo)(PostsPage);
