import { EnergySymbol } from "@/components/EnergySymbol";
import copy from "@/content/en.json";
import { articleKindLabel } from "@/utils/articlePresentation";

import { kindEnergy } from "./types";

import type { KindTagProps } from "./types";

function KindTagView({ kind }: KindTagProps) {
  return (
    <span className="kind-tag" data-kind={kind}>
      <span className="kind-tag__segment">
        <EnergySymbol type={kindEnergy[kind]} />
        {copy.broadcast.kindSegments[kind]}
      </span>
      <span className="kind-tag__label">{articleKindLabel(kind)}</span>
    </span>
  );
}

export default KindTagView;
