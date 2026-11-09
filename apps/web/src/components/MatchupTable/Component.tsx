import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import MatchupTableView from "./View";

import type { MatchupTableProps } from "./types";

function MatchupTable(props: MatchupTableProps) {
  return <MatchupTableView {...props} />;
}

export default pipeline(memo)(MatchupTable);
