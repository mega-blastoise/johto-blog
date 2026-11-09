import { Link } from "react-router";

import { sprites } from "@/assets/johto-gbc/sprites";
import { ArticleCard } from "@/components/ArticleCard";
import { DialogueBox } from "@/components/DialogueBox";
import { EventList } from "@/components/EventList";
import { FormatStatus } from "@/components/FormatStatus";
import copy from "@/content/en.json";
import {
  selectDeckEntries,
  selectNextSet,
  selectSetLegalOn,
  selectTopDecks,
  selectUpcomingEvents,
} from "@/services/Catalog";
import { selectHomePosts } from "@/services/Posts";
import { deckPath } from "@/utils/articlePresentation";
import { deckSprite, tierHealth } from "@/utils/deckSprite";
import { formatMessage } from "@/utils/formatMessage";

import type { HomeViewProps } from "./types";

function HomeView({ catalog, today }: HomeViewProps) {
  const { featuredPosts, recentPosts } = selectHomePosts(catalog.posts);
  const topDecks = selectTopDecks(
    selectDeckEntries(catalog.decks, catalog.posts),
  );
  const upcomingEvents = selectUpcomingEvents(catalog.events, today);

  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__copy">
          <p className="eyebrow">{copy.home.hero.eyebrow}</p>
          <h1 id="home-title">
            {copy.home.hero.titleFirstLine}
            <br />
            {copy.home.hero.titleSecondLine}
          </h1>
          <DialogueBox
            className="hero__dialogue"
            speaker={copy.home.hero.speaker}
          >
            <p>{copy.home.hero.description}</p>
          </DialogueBox>
          <div className="hero__actions">
            <Link className="button button--primary" to="/decks/">
              {copy.home.hero.decksCta} <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button--quiet" to="/events/">
              {copy.home.hero.eventsCta} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="hero__card">
          <img
            alt=""
            aria-hidden="true"
            className="hero__legend"
            height={56}
            src={sprites.hoOh}
            width={56}
          />
          <h2 className="hero__card-label">{copy.home.hero.topDecksLabel}</h2>
          {topDecks.length > 0 ? (
            <ol>
              {topDecks.map((entry) => {
                const health = tierHealth(entry.deck.tier);
                return (
                  <li key={entry.deck.slug}>
                    <img
                      alt=""
                      aria-hidden="true"
                      className="party-slot__sprite"
                      height={56}
                      src={deckSprite(entry.number, true)}
                      width={56}
                    />
                    <span className="party-slot__body">
                      <Link
                        className="party-slot__name"
                        to={deckPath(entry.deck.slug)}
                      >
                        <span className="party-slot__index">
                          {entry.deck.tier
                            ? formatMessage(copy.decks.tier, {
                                tier: entry.deck.tier,
                              })
                            : copy.decks.untiered}
                        </span>{" "}
                        {entry.deck.name}
                      </Link>
                      <span className="hp-bar" aria-hidden="true">
                        <span className="hp-bar__label">
                          {copy.home.hero.hpLabel}
                        </span>
                        <span className="hp-bar__track">
                          <span
                            className={`hp-bar__fill hp-bar__fill--${health.tone}`}
                            style={{ width: health.width }}
                          />
                        </span>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="hero__card-empty">{copy.home.hero.topDecksEmpty}</p>
          )}
          <span className="hero__card-foot">{copy.home.hero.topDecksFoot}</span>
        </div>
      </section>

      <FormatStatus
        currentSet={selectSetLegalOn(catalog.sets, today)}
        nextEvent={upcomingEvents[0]}
        nextSet={selectNextSet(catalog.sets, today)}
        today={today}
      />

      <section className="journal" aria-labelledby="latest-title">
        <div className="section-heading section-heading--journal">
          <div>
            <p className="eyebrow">{copy.home.latest.eyebrow}</p>
            <h2 id="latest-title">{copy.home.latest.title}</h2>
          </div>
          <Link className="text-link" to="/journal/">
            {copy.home.latest.archiveCta} <span aria-hidden="true">→</span>
          </Link>
        </div>
        {featuredPosts.length > 0 ? (
          <div className="featured-grid">
            {featuredPosts.map((post, index) => (
              <ArticleCard
                article={post}
                key={post.slug}
                priority={index === 0}
              />
            ))}
          </div>
        ) : null}
        {recentPosts.length > 0 ? (
          <div className="home-recent">
            <div className="section-heading">
              <p className="eyebrow">{copy.home.latest.recentTitle}</p>
            </div>
            <div className="article-grid">
              {recentPosts.map((post) => (
                <ArticleCard article={post} key={post.slug} />
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="home-events" aria-labelledby="home-events-title">
        <div className="section-heading section-heading--journal">
          <div>
            <p className="eyebrow">{copy.home.events.eyebrow}</p>
            <h2 id="home-events-title">{copy.home.events.title}</h2>
          </div>
          <Link className="text-link" to="/events/">
            {copy.home.events.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
        {upcomingEvents.length > 0 ? (
          <EventList events={upcomingEvents.slice(0, 4)} today={today} />
        ) : (
          <p className="empty-state">{copy.events.upcomingEmpty}</p>
        )}
      </section>
    </>
  );
}

export default HomeView;
