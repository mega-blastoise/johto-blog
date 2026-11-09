import { Link } from "react-router";

import { ArticleCard } from "@/components/ArticleCard";
import { DeckCard } from "@/components/DeckCard";
import { NotFoundView } from "@/components/NotFound";
import copy from "@/content/en.json";
import {
  findSet,
  postsForSet,
  selectBuildsBeforeSet,
  selectDeckEntries,
} from "@/services/Catalog";
import { formatArticleDate } from "@/utils/articlePresentation";
import { formatMessage } from "@/utils/formatMessage";

import type { SetDetailViewProps } from "./types";

function SetDetailView({ catalog, code, today }: SetDetailViewProps) {
  const set = findSet(catalog.sets, code);
  if (!set) return <NotFoundView />;

  const posts = postsForSet(catalog.posts, set.code);
  const outdated = selectBuildsBeforeSet(
    selectDeckEntries(catalog.decks, catalog.posts),
    set,
    today,
  );
  const status = formatMessage(
    set.legal > today ? copy.set.statusUpcoming : copy.set.statusLegal,
    { date: formatArticleDate(set.legal) },
  );

  return (
    <section className="journal" aria-labelledby="set-title">
      <Link className="back-link" to="/sets/">
        <span aria-hidden="true">←</span> {copy.set.backToSets}
      </Link>
      <div className="section-heading detail-heading">
        <p className="eyebrow">{status}</p>
        <h1 id="set-title">{set.name}</h1>
      </div>
      <dl className="fact-strip">
        <div>
          <dt>{copy.set.code}</dt>
          <dd>{set.code}</dd>
        </div>
        <div>
          <dt>{copy.set.released}</dt>
          <dd>{formatArticleDate(set.released)}</dd>
        </div>
        <div>
          <dt>{copy.set.legal}</dt>
          <dd>{formatArticleDate(set.legal)}</dd>
        </div>
        {set.regulationMark ? (
          <div>
            <dt>{copy.set.mark}</dt>
            <dd>{set.regulationMark}</dd>
          </div>
        ) : null}
      </dl>

      <section className="sets-section" aria-labelledby="set-posts-title">
        <div className="section-heading">
          <h2 id="set-posts-title">{copy.set.postsTitle}</h2>
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

      {outdated.length > 0 ? (
        <section className="sets-section" aria-labelledby="set-outdated-title">
          <div className="section-heading">
            <h2 id="set-outdated-title">{copy.set.affectedTitle}</h2>
            <p className="section-heading__description">
              {formatMessage(copy.set.affectedDescription, { name: set.name })}
            </p>
          </div>
          <div className="dex-grid">
            {outdated.map((entry) => (
              <DeckCard entry={entry} key={entry.deck.slug} newerSet={set} />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}

export default SetDetailView;
