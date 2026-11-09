import { ArticleCard } from "@/components/ArticleCard";
import { EventList } from "@/components/EventList";
import copy from "@/content/en.json";
import { selectPastEvents, selectUpcomingEvents } from "@/services/Catalog";

import type { EventsViewProps } from "./types";

function EventsView({ catalog, today }: EventsViewProps) {
  const upcoming = selectUpcomingEvents(catalog.events, today);
  const past = selectPastEvents(catalog.events, today);
  const posts = catalog.posts.filter((post) => post.kind === "event");

  return (
    <section className="journal" aria-labelledby="events-title">
      <div className="section-heading">
        <p className="eyebrow">{copy.events.eyebrow}</p>
        <h1 id="events-title">{copy.events.title}</h1>
        <p className="section-heading__description">
          {copy.events.description}
        </p>
      </div>

      <section className="sets-section" aria-labelledby="upcoming-title">
        <div className="section-heading">
          <h2 id="upcoming-title">{copy.events.upcomingTitle}</h2>
        </div>
        {upcoming.length > 0 ? (
          <EventList events={upcoming} today={today} />
        ) : (
          <p className="empty-state">{copy.events.upcomingEmpty}</p>
        )}
      </section>

      <section className="sets-section" aria-labelledby="event-posts-title">
        <div className="section-heading">
          <h2 id="event-posts-title">{copy.events.postsTitle}</h2>
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

      {past.length > 0 ? (
        <section className="sets-section" aria-labelledby="past-title">
          <div className="section-heading">
            <h2 id="past-title">{copy.events.pastTitle}</h2>
          </div>
          <EventList countdown={false} events={past} today={today} />
        </section>
      ) : null}
    </section>
  );
}

export default EventsView;
