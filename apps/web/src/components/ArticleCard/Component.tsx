import type { Article } from "@prize-map/types";

import { articlePath } from "@/lib/routes";
import { formatDate, kindLabels } from "@/lib/present";

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  return (
    <article
      className={
        priority ? "article-card article-card--priority" : "article-card"
      }
    >
      <div className="article-card__eyebrow">
        <span className="type-pill">{kindLabels[article.kind]}</span>
        <time dateTime={article.updated}>
          Updated {formatDate(article.updated)}
        </time>
      </div>
      <h2>
        <a href={articlePath(article.slug)}>{article.title}</a>
      </h2>
      <p>{article.excerpt}</p>
      {article.deck ? (
        <dl className="deck-context" aria-label="Deck report context">
          <div>
            <dt>Build</dt>
            <dd>{article.deck.version}</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>{article.format}</dd>
          </div>
          {article.deck.event ? (
            <div>
              <dt>Window</dt>
              <dd>{article.deck.event}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      <footer className="article-card__footer">
        <span>{article.tags.slice(0, 3).join(" · ")}</span>
        <a className="text-link" href={articlePath(article.slug)}>
          Read note <span aria-hidden="true">→</span>
        </a>
      </footer>
    </article>
  );
}
