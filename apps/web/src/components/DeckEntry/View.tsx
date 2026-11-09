import { Link } from "react-router";

import { ArticleCard } from "@/components/ArticleCard";
import { Decklist } from "@/components/Decklist";
import { DialogueBox } from "@/components/DialogueBox";
import { MatchupTable } from "@/components/MatchupTable";
import { NotFoundView } from "@/components/NotFound";
import { StaleBanner } from "@/components/StaleBanner";
import copy from "@/content/en.json";
import { selectDeckEntry, selectNewerSet } from "@/services/Catalog";
import {
  articlePath,
  deckPath,
  formatArticleDate,
  formatLabel,
} from "@/utils/articlePresentation";
import { deckSprite, tierHealth } from "@/utils/deckSprite";
import { formatMessage } from "@/utils/formatMessage";

import type { DeckEntryViewProps } from "./types";

function DeckEntryView({ archetype, catalog, today }: DeckEntryViewProps) {
  const entry = selectDeckEntry(archetype, catalog.decks, catalog.posts);
  if (!entry) return <NotFoundView />;

  const { builds, deck, latest, number, opposingViews } = entry;
  const newerSet = latest
    ? selectNewerSet(latest, catalog.sets, today)
    : undefined;
  const health = tierHealth(deck.tier);
  const tierLabel = deck.tier
    ? formatMessage(copy.decks.tier, { tier: deck.tier })
    : copy.decks.untiered;

  return (
    <article className="deck-entry">
      <Link className="back-link" to="/decks/">
        <span aria-hidden="true">←</span> {copy.deck.backToDex}
      </Link>

      <header className="deck-entry__header">
        <div className="dex-panel">
          <img
            alt=""
            aria-hidden="true"
            className="dex-panel__sprite"
            height={96}
            src={deckSprite(number, latest !== undefined)}
            width={96}
          />
          <span className="dex-card__number">
            {formatMessage(copy.decks.number, {
              number: String(number).padStart(3, "0"),
            })}
          </span>
          <span className="hp-bar">
            <span className="hp-bar__label">{tierLabel}</span>
            <span className="hp-bar__track" aria-hidden="true">
              <span
                className={`hp-bar__fill hp-bar__fill--${health.tone}`}
                style={{ width: health.width }}
              />
            </span>
          </span>
          {latest?.deck ? (
            <dl className="dex-panel__facts">
              <div>
                <dt>{copy.deck.version}</dt>
                <dd>{latest.deck.version}</dd>
              </div>
              <div>
                <dt>{copy.deck.updated}</dt>
                <dd>{formatArticleDate(latest.updated)}</dd>
              </div>
              <div>
                <dt>{copy.article.formatLabel}</dt>
                <dd>{formatLabel(latest)}</dd>
              </div>
              {latest.deck.record ? (
                <div>
                  <dt>{copy.deck.record}</dt>
                  <dd>{latest.deck.record}</dd>
                </div>
              ) : null}
              {latest.deck.event ? (
                <div>
                  <dt>{copy.deck.event}</dt>
                  <dd>{latest.deck.event}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>
        <div className="deck-entry__intro">
          <p className="eyebrow">{copy.decks.eyebrow}</p>
          <h1>{deck.name}</h1>
          {newerSet ? <StaleBanner set={newerSet} /> : null}
          {latest?.deck ? (
            <DialogueBox
              className="deck-entry__summary"
              speaker={copy.deck.currentBuild}
            >
              <p>{latest.excerpt}</p>
              <p>
                <Link className="text-link" to={articlePath(latest.slug)}>
                  {formatMessage(copy.deck.readBuild, {
                    version: latest.deck.version,
                  })}{" "}
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
            </DialogueBox>
          ) : (
            <DialogueBox className="deck-entry__summary">
              <p>
                <strong>{copy.deck.unwrittenTitle}</strong>{" "}
                {copy.deck.unwrittenDescription}
              </p>
            </DialogueBox>
          )}
        </div>
      </header>

      {latest ? (
        <section className="glance" aria-label={copy.article.atAGlance}>
          <MatchupTable
            counters={latest.counters}
            decks={catalog.decks}
            matchups={latest.matchups}
          />
        </section>
      ) : null}

      {latest?.decklist ? (
        <Decklist decklist={latest.decklist} version={latest.deck?.version} />
      ) : null}

      {opposingViews.length > 0 ? (
        <section
          className="deck-entry__section"
          aria-labelledby="other-side-title"
        >
          <div className="section-heading">
            <h2 id="other-side-title">{copy.deck.otherSide}</h2>
            <p className="section-heading__description">
              {copy.deck.otherSideDescription}
            </p>
          </div>
          <ul className="matchups__list">
            {opposingViews.map(({ deck: other, matchup, post }) => {
              const result = copy.matchups.results[matchup.result];
              return (
                <li
                  className={`matchup matchup--${matchup.result}`}
                  key={other.slug}
                >
                  <Link className="matchup__deck" to={deckPath(other.slug)}>
                    {other.name}
                  </Link>
                  <span className="matchup__result">{result.label}</span>
                  <p className="matchup__text">{result.text}</p>
                  {matchup.note ? (
                    <p className="matchup__note">{matchup.note}</p>
                  ) : null}
                  <Link className="text-link" to={articlePath(post.slug)}>
                    {post.deck?.version} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {builds.length > 0 ? (
        <section
          className="deck-entry__section"
          aria-labelledby="history-title"
        >
          <div className="section-heading">
            <h2 id="history-title">{copy.deck.history}</h2>
          </div>
          <div className="article-grid">
            {builds.map((post, index) => (
              <ArticleCard
                article={post}
                key={post.slug}
                priority={index === 0}
              />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

export default DeckEntryView;
