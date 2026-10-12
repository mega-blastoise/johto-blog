import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import ArticleCardView from "./View";

import type { ArticleCardProps } from "./types";

function ArticleCard(props: ArticleCardProps) {
  return <ArticleCardView {...props} />;
}

export default pipeline(memo)(ArticleCard);
