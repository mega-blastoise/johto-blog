import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import StaleBannerView from "./View";

import type { StaleBannerProps } from "./types";

function StaleBanner(props: StaleBannerProps) {
  return <StaleBannerView {...props} />;
}

export default pipeline(memo)(StaleBanner);
