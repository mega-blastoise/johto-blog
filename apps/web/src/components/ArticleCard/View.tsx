import { Link } from "react-router";

import { KindTag } from "@/components/KindTag";
import copy from "@/content/en.json";
import {
  articlePath,
  formatArticleDate,
  formatLabel,
} from "@/utils/articlePresentation";
import { formatMessage } from "@/utils/formatMessage";

import type { ArticleCardProps } from "./types";

function ArticleCardView({ article, priority = false }: ArticleCardProps) {
  return (
    <article
      className={
        priority ? "article-card article-card--priority" : "article-card"
      }
      data-kind={article.kind}
    >
      <div className="article-card__eyebrow">
        <KindTag kind={article.kind} />
        <time dateTime={article.updated}>
          {formatMessage(copy.common.updated, {
            date: formatArticleDate(article.updated),
          })}
        </time>
      </div>
      {priority ? (
        <p className="article-card__marker">{copy.broadcast.featuredMatch}</p>
      ) : null}
      <h2>
        <Link to={articlePath(article.slug)}>{article.title}</Link>
      </h2>
      <p>{article.excerpt}</p>
      {article.deck ? (
        <dl className="deck-context" aria-label={copy.article.deckContextLabel}>
          <div>
            <dt>{copy.article.build}</dt>
            <dd>{article.deck.version}</dd>
          </div>
          <div>
            <dt>{copy.article.formatLabel}</dt>
            <dd>{formatLabel(article)}</dd>
          </div>
          {article.deck.event ? (
            <div>
              <dt>{copy.article.window}</dt>
              <dd>{article.deck.event}</dd>
            </div>
          ) : null}
          {article.deck.record ? (
            <div>
              <dt>{copy.article.record}</dt>
              <dd>{article.deck.record}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      <footer className="article-card__footer">
        <span>{article.tags.slice(0, 3).join(" · ")}</span>
        <Link className="text-link" to={articlePath(article.slug)}>
          {copy.common.readNote} <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </article>
  );
}

export default ArticleCardView;
