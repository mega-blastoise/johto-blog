import { memo } from "react";
import { useLocation } from "react-router";

import { pipeline } from "@/utils/pipeline";

import SiteHeaderView from "./View";

function SiteHeader() {
  const { pathname } = useLocation();
  return <SiteHeaderView pathname={pathname} />;
}

export default pipeline(memo)(SiteHeader);
