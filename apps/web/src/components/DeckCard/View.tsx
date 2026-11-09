import { Link } from "react-router";

import copy from "@/content/en.json";
import { deckPath, formatArticleDate } from "@/utils/articlePresentation";
import { deckSprite, tierHealth } from "@/utils/deckSprite";
import { formatMessage } from "@/utils/formatMessage";

import type { DeckCardProps } from "./types";

function DeckCardView({ entry, newerSet }: DeckCardProps) {
  const { deck, latest, number } = entry;
  const health = tierHealth(deck.tier);
  const tierLabel = deck.tier
    ? formatMessage(copy.decks.tier, { tier: deck.tier })
    : copy.decks.untiered;

  return (
    <article className={latest ? "dex-card" : "dex-card dex-card--unwritten"}>
      <img
        alt=""
        aria-hidden="true"
        className="dex-card__sprite"
        height={56}
        src={deckSprite(number, latest !== undefined)}
        width={56}
      />
      <div className="dex-card__body">
        <span className="dex-card__number">
          {formatMessage(copy.decks.number, {
            number: String(number).padStart(3, "0"),
          })}
        </span>
        <h2 className="dex-card__name">
          <Link to={deckPath(deck.slug)}>{deck.name}</Link>
        </h2>
        <span className="hp-bar">
          <span className="hp-bar__label">{tierLabel}</span>
          <span className="hp-bar__track" aria-hidden="true">
            <span
              className={`hp-bar__fill hp-bar__fill--${health.tone}`}
              style={{ width: health.width }}
            />
          </span>
        </span>
        <span className="dex-card__meta">
          {latest?.deck
            ? formatMessage(copy.decks.latest, {
                version: latest.deck.version,
                date: formatArticleDate(latest.updated),
              })
            : copy.decks.unwritten}
          {newerSet ? (
            <span className="dex-card__stale">
              {formatMessage(copy.decks.stale, { code: newerSet.code })}
            </span>
          ) : null}
        </span>
      </div>
    </article>
  );
}

export default DeckCardView;
