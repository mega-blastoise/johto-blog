import { Link } from "react-router";

import { sprites } from "@/assets/johto-gbc/sprites";
import copy from "@/content/en.json";
import {
  eventPath,
  formatArticleDate,
  formatDateRange,
  setPath,
} from "@/utils/articlePresentation";
import { countdownLabel } from "@/utils/dates";
import { formatMessage } from "@/utils/formatMessage";

import type { FormatStatusProps } from "./types";

// The Pokégear radio: what's legal right now and what's coming next.
function FormatStatusView({
  currentSet,
  nextEvent,
  nextSet,
  today,
}: FormatStatusProps) {
  return (
    <aside className="format-brief" aria-labelledby="format-status-title">
      <div className="format-brief__header">
        <span className="format-brief__device">
          <span className="signal-dot" aria-hidden="true" />
          {copy.home.format.device}
        </span>
        <p>{copy.home.format.eyebrow}</p>
        <h2 id="format-status-title">{copy.home.format.formatName}</h2>
        <img
          alt=""
          aria-hidden="true"
          className="format-brief__sprite"
          height={56}
          src={sprites.lugia}
          width={56}
        />
      </div>

      <div className="format-brief__cell">
        <small>{copy.home.format.currentSetLabel}</small>
        {currentSet ? (
          <Link className="brief-link" to={setPath(currentSet.code)}>
            <span>
              {currentSet.name}
              <small>
                {formatMessage(copy.home.format.legalSince, {
                  date: formatArticleDate(currentSet.legal),
                })}
              </small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          <p className="format-brief__none">{copy.home.format.noSet}</p>
        )}
      </div>

      <div className="format-brief__cell">
        <small>{copy.home.format.nextSetLabel}</small>
        {nextSet ? (
          <Link className="brief-link" to={setPath(nextSet.code)}>
            <span>
              {nextSet.name}
              <small>
                {formatMessage(copy.home.format.legalOn, {
                  date: formatArticleDate(nextSet.legal),
                })}
              </small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          <p className="format-brief__none">{copy.home.format.noNextSet}</p>
        )}
      </div>

      <div className="format-brief__cell">
        <small>{copy.home.format.nextEventLabel}</small>
        {nextEvent ? (
          <Link className="brief-link" to={eventPath(nextEvent.slug)}>
            <span>
              {nextEvent.name}
              <small>
                {formatDateRange(nextEvent.starts, nextEvent.ends)} ·{" "}
                {countdownLabel(today, nextEvent.starts, nextEvent.ends)}
              </small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          <p className="format-brief__none">{copy.home.format.noEvent}</p>
        )}
      </div>

      <div className="format-brief__checklist">
        <Link to="/sets/">
          {copy.home.format.setsCta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}

export default FormatStatusView;
