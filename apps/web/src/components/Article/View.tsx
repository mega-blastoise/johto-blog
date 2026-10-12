import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ArticleCard } from "@/components/ArticleCard";
import { NotFoundView } from "@/components/NotFound";
import copy from "@/content/en.json";
import {
  articleKindLabel,
  articlePath,
  formatArticleDate,
  formatLabel,
} from "@/utils/articlePresentation";
import { formatMessage } from "@/utils/formatMessage";

import type { ArticleViewProps } from "./types";

function ArticleView({ article, relatedPosts }: ArticleViewProps) {
  if (!article) return <NotFoundView />;

  return (
    <article className="article-detail">
      <Link className="back-link" to="/posts/">
        <span aria-hidden="true">←</span> {copy.common.backToJournal}
      </Link>
      <header className="article-detail__header">
        <div className="article-card__eyebrow">
          <span className="type-pill">{articleKindLabel(article.kind)}</span>
          <time dateTime={article.updated}>
            {formatMessage(copy.common.updated, {
              date: formatArticleDate(article.updated),
            })}
          </time>
        </div>
        <h1>{article.title}</h1>
        <p className="article-detail__deck">{article.excerpt}</p>
        <div className="article-detail__metadata">
          <span>
            {formatMessage(copy.common.format, {
              format: formatLabel(article),
            })}
          </span>
          <span>
            {formatMessage(copy.common.published, {
              date: formatArticleDate(article.date),
            })}
          </span>
          {article.deck ? (
            <span>
              {formatMessage(copy.common.version, {
                version: article.deck.version,
              })}
            </span>
          ) : null}
        </div>
      </header>
      <div className="article-detail__body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.body}
        </ReactMarkdown>
      </div>
      <footer className="article-detail__footer">
        <p>
          {copy.common.filedUnder} <strong>{article.tags.join(" · ")}</strong>
        </p>
        <Link className="text-link" to={articlePath(article.slug)}>
          {copy.common.permanentLink} <span aria-hidden="true">↗</span>
        </Link>
      </footer>
      {relatedPosts.length > 0 ? (
        <section
          className="related-notes"
          aria-labelledby="related-notes-title"
        >
          <div className="section-heading">
            <p className="eyebrow">{copy.article.relatedEyebrow}</p>
            <h2 id="related-notes-title">{copy.article.relatedTitle}</h2>
          </div>
          <div className="article-grid">
            {relatedPosts.map((relatedArticle) => (
              <ArticleCard article={relatedArticle} key={relatedArticle.slug} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

export default ArticleView;
