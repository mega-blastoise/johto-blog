import { Link } from "react-router";

import copy from "@/content/en.json";
import { articlePath, formatArticleDate } from "@/utils/articlePresentation";
import { formatMessage } from "@/utils/formatMessage";

import type { FormatBriefProps } from "./types";

function FormatBriefView({ latestBrief }: FormatBriefProps) {
  return (
    <aside className="format-brief" aria-labelledby="format-brief-title">
      <div className="format-brief__header">
        <span className="signal-dot" aria-hidden="true" />
        <p>{copy.home.brief.eyebrow}</p>
      </div>
      <h2 id="format-brief-title">{copy.home.brief.title}</h2>
      <p className="format-brief__copy">{copy.home.brief.description}</p>
      {latestBrief ? (
        <Link className="brief-link" to={articlePath(latestBrief.slug)}>
          <span>
            <small>
              {formatMessage(copy.home.brief.latestLabel, {
                date: formatArticleDate(latestBrief.updated),
              })}
            </small>
            {latestBrief.title}
          </span>
          <span aria-hidden="true">↗</span>
        </Link>
      ) : null}
      <div className="format-brief__checklist">
        {copy.home.brief.checklist.map((item, index) => (
          <span
            key={item}
          >{`${String(index + 1).padStart(2, "0")} · ${item}`}</span>
        ))}
      </div>
    </aside>
  );
}

export default FormatBriefView;
