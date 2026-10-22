import copy from "@/content/en.json";
import { formatMessage } from "@/utils/formatMessage";

import { prizeCount } from "./types";

import type { PrizeTrackProps } from "./types";

function PrizeTrackView({ label, taken }: PrizeTrackProps) {
  const summary = formatMessage(copy.broadcast.prizesLabel, {
    taken,
    total: prizeCount,
  });

  return (
    <div className="prize-track">
      {label ? (
        <span className="prize-track__label" aria-hidden="true">
          {label}
        </span>
      ) : null}
      <span className="sr-only">{summary}</span>
      <span className="prize-track__cards" aria-hidden="true">
        {Array.from({ length: prizeCount }, (_, index) => (
          <span
            className={
              index < taken ? "prize-card prize-card--taken" : "prize-card"
            }
            key={index}
          />
        ))}
      </span>
    </div>
  );
}

export default PrizeTrackView;
