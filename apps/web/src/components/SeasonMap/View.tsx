import { Link } from "react-router";

import copy from "@/content/en.json";
import { formatArticleDate, setPath } from "@/utils/articlePresentation";
import { formatMessage } from "@/utils/formatMessage";

import type { TimelineStop } from "@/services/Catalog";
import type { SeasonMapProps } from "./types";

function StopLabel({ stop }: { stop: TimelineStop }) {
  if (stop.kind === "today") {
    return <span className="season-map__label">{copy.sets.today}</span>;
  }
  if (stop.kind === "rotation") {
    return (
      <span className="season-map__label">
        {formatMessage(copy.sets.rotationStop, {
          season: stop.rotation.season,
        })}
        <small>
          {formatMessage(copy.sets.rotationOut, {
            marks: stop.rotation.marks.join(", "),
          })}
        </small>
      </span>
    );
  }
  return (
    <span className="season-map__label">
      <Link to={setPath(stop.set.code)}>{stop.set.code}</Link>
      <small>{stop.set.name}</small>
    </span>
  );
}

// Pokégear map card: sets are towns on the route, rotations are roadblocks,
// and the blinking marker is where the format is today.
function SeasonMapView({ stops }: SeasonMapProps) {
  if (stops.length === 0) {
    return <p className="season-map__empty">{copy.sets.mapEmpty}</p>;
  }

  return (
    <div
      className="season-map"
      role="region"
      aria-label={copy.sets.mapLabel}
      tabIndex={0}
    >
      <ol className="season-map__route">
        {stops.map((stop) => (
          <li
            className={`season-map__stop season-map__stop--${stop.kind}`}
            key={`${stop.kind}-${stop.date}-${stop.kind === "set" ? stop.set.code : ""}`}
          >
            <span className="season-map__marker" aria-hidden="true" />
            <time dateTime={stop.date}>{formatArticleDate(stop.date)}</time>
            <StopLabel stop={stop} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default SeasonMapView;
