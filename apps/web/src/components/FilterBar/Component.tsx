import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import FilterBarView from "./View";

import type { FilterBarProps } from "./types";

function FilterBar(props: FilterBarProps) {
  return <FilterBarView {...props} />;
}

export default pipeline(memo)(FilterBar);
