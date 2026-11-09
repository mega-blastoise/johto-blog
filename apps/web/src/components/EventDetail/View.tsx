import { Link } from "react-router";

import { ArticleCard } from "@/components/ArticleCard";
import { NotFoundView } from "@/components/NotFound";
import copy from "@/content/en.json";
import { postsForEvent, selectSetLegalOn } from "@/services/Catalog";
import {
  eventTierLabel,
  formatDateRange,
  formatLabel,
  setPath,
} from "@/utils/articlePresentation";
import { countdownLabel } from "@/utils/dates";

import type { EventDetailViewProps } from "./types";

function EventDetailView({ catalog, slug, today }: EventDetailViewProps) {
  const event = catalog.events.find((candidate) => candidate.slug === slug);
  if (!event) return <NotFoundView />;

  const posts = postsForEvent(catalog.posts, event.slug);
  const legalSet = selectSetLegalOn(catalog.sets, event.starts);
  const countdown = countdownLabel(today, event.starts, event.ends);

  return (
    <section className="journal" aria-labelledby="event-title">
      <Link className="back-link" to="/events/">
        <span aria-hidden="true">←</span> {copy.event.backToEvents}
      </Link>
      <div className="section-heading detail-heading">
        <p className="eyebrow">
          {eventTierLabel(event.tier)}
          {countdown ? ` · ${countdown}` : ""}
        </p>
        <h1 id="event-title">{event.name}</h1>
      </div>
      <dl className="fact-strip">
        <div>
          <dt>{copy.event.dates}</dt>
          <dd>{formatDateRange(event.starts, event.ends)}</dd>
        </div>
        <div>
          <dt>{copy.event.location}</dt>
          <dd>{event.location}</dd>
        </div>
        <div>
          <dt>{copy.event.format}</dt>
          <dd>{formatLabel(event)}</dd>
        </div>
        <div>
          <dt>{copy.event.legalSet}</dt>
          <dd>
            {legalSet ? (
              <Link to={setPath(legalSet.code)}>{legalSet.name}</Link>
            ) : (
              copy.event.noLegalSet
            )}
          </dd>
        </div>
      </dl>
      {event.url ? (
        <p className="detail-link">
          <a
            className="text-link"
            href={event.url}
            rel="noreferrer"
            target="_blank"
          >
            {copy.event.officialLink} <span aria-hidden="true">↗</span>
          </a>
        </p>
      ) : null}

      <section className="sets-section" aria-labelledby="event-posts-title">
        <div className="section-heading">
          <h2 id="event-posts-title">{copy.event.postsTitle}</h2>
        </div>
        {posts.length > 0 ? (
          <div className="article-grid">
            {posts.map((post) => (
              <ArticleCard article={post} key={post.slug} />
            ))}
          </div>
        ) : (
          <p className="empty-state">{copy.common.postsEmpty}</p>
        )}
      </section>
    </section>
  );
}

export default EventDetailView;
