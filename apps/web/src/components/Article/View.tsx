import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ArticleCard } from "@/components/ArticleCard";
import { KindTag } from "@/components/KindTag";
import { NotFoundView } from "@/components/NotFound";
import copy from "@/content/en.json";
import {
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
      <header className="article-detail__header" data-kind={article.kind}>
        <div className="article-card__eyebrow">
          <KindTag kind={article.kind} />
          <time dateTime={article.updated}>
            {formatMessage(copy.common.updated, {
              date: formatArticleDate(article.updated),
            })}
          </time>
        </div>
        <h1>{article.title}</h1>
        <p className="article-detail__deck">{article.excerpt}</p>
        <dl
          className="article-detail__metadata"
          aria-label={copy.article.metadataLabel}
        >
          <div>
            <dt>{copy.article.formatLabel}</dt>
            <dd>{formatLabel(article)}</dd>
          </div>
          <div>
            <dt>{copy.article.published}</dt>
            <dd>{formatArticleDate(article.date)}</dd>
          </div>
          {article.deck ? (
            <div>
              <dt>{copy.article.build}</dt>
              <dd>{article.deck.version}</dd>
            </div>
          ) : null}
          {article.deck?.record ? (
            <div>
              <dt>{copy.article.record}</dt>
              <dd>{article.deck.record}</dd>
            </div>
          ) : null}
        </dl>
      </header>
      <div className="article-detail__body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.body}
        </ReactMarkdown>
      </div>
      <footer className="article-detail__footer">
        <p>
          {copy.common.filedUnder}{" "}
          {article.tags.map((tag) => (
            <strong key={tag}>{tag}</strong>
          ))}
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
