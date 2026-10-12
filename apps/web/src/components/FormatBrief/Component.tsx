import type { Article } from "@prize-map/types";

import { articlePath } from "@/lib/routes";
import { formatDate } from "@/lib/present";

interface FormatBriefProps {
  latestBrief?: Article;
}

export function FormatBrief({ latestBrief }: FormatBriefProps) {
  return (
    <aside className="format-brief" aria-labelledby="format-brief-title">
      <div className="format-brief__header">
        <span className="signal-dot" aria-hidden="true" />
        <p>Format intelligence</p>
      </div>
      <h2 id="format-brief-title">
        Your field read should have an expiry date.
      </h2>
      <p className="format-brief__copy">
        Prize Map keeps the source window, confidence, and next test visible—so
        a strong result never disguises a stale conclusion.
      </p>
      {latestBrief ? (
        <a className="brief-link" href={articlePath(latestBrief.slug)}>
          <span>
            <small>
              Latest editorial framework · {formatDate(latestBrief.updated)}
            </small>
            {latestBrief.title}
          </span>
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      <div className="format-brief__checklist">
        <span>01 · Format boundary</span>
        <span>02 · Event evidence</span>
        <span>03 · Deck decision</span>
      </div>
    </aside>
  );
}
