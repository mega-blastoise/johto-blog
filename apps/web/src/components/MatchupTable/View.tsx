import { Link } from "react-router";

import copy from "@/content/en.json";
import { deckPath } from "@/utils/articlePresentation";

import type { MatchupTableProps } from "./types";

function MatchupTableView({ counters, decks, matchups }: MatchupTableProps) {
  const nameOf = (slug: string) =>
    decks.find((deck) => deck.slug === slug)?.name ?? slug;

  return (
    <div className="matchups">
      <h3 className="matchups__title">{copy.matchups.title}</h3>
      {matchups.length > 0 ? (
        <ul className="matchups__list">
          {matchups.map((matchup) => {
            const result = copy.matchups.results[matchup.result];
            return (
              <li
                className={`matchup matchup--${matchup.result}`}
                key={matchup.vs}
              >
                <Link className="matchup__deck" to={deckPath(matchup.vs)}>
                  {nameOf(matchup.vs)}
                </Link>
                <span className="matchup__result">{result.label}</span>
                <p className="matchup__text">{result.text}</p>
                {matchup.note ? (
                  <p className="matchup__note">{matchup.note}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="matchups__empty">{copy.matchups.empty}</p>
      )}
      {counters.length > 0 ? (
        <div className="matchups__counters">
          <h3 className="matchups__title">{copy.matchups.countersTitle}</h3>
          <ul>
            {counters.map((slug) => (
              <li key={slug}>
                <Link to={deckPath(slug)}>{nameOf(slug)}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default MatchupTableView;
