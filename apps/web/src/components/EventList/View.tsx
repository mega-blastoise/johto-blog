import { Link } from "react-router";

import {
  eventPath,
  eventTierLabel,
  formatDateRange,
  formatLabel,
} from "@/utils/articlePresentation";
import { countdownLabel } from "@/utils/dates";

import type { EventListProps } from "./types";

function EventListView({ countdown = true, events, today }: EventListProps) {
  return (
    <ol className="event-list">
      {events.map((event) => {
        const label = countdown
          ? countdownLabel(today, event.starts, event.ends)
          : "";
        return (
          <li className="event-row" key={event.slug}>
            <time className="event-row__date" dateTime={event.starts}>
              {formatDateRange(event.starts, event.ends)}
            </time>
            <span className={`tier-pill tier-pill--${event.tier}`}>
              {eventTierLabel(event.tier)}
            </span>
            <span className="event-row__body">
              <Link className="event-row__name" to={eventPath(event.slug)}>
                {event.name}
              </Link>
              <span className="event-row__where">
                {event.location} · {formatLabel(event)}
              </span>
            </span>
            {label ? (
              <span className="event-row__countdown">{label}</span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export default EventListView;
