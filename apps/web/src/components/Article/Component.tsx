import type { Article as ArticleRecord } from "@prize-map/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ArticleCard } from "@/components/ArticleCard";
import { articlePath } from "@/lib/routes";
import { formatDate, kindLabels, relatedArticles } from "@/lib/present";

interface ArticleProps {
  article: ArticleRecord;
  allPosts: readonly ArticleRecord[];
}

export function Article({ article, allPosts }: ArticleProps) {
  const related = relatedArticles(article, allPosts);

  return (
    <article className="article-detail">
      <a className="back-link" href="/">
        <span aria-hidden="true">←</span> Journal
      </a>
      <header className="article-detail__header">
        <div className="article-card__eyebrow">
          <span className="type-pill">{kindLabels[article.kind]}</span>
          <time dateTime={article.updated}>
            Updated {formatDate(article.updated)}
          </time>
        </div>
        <h1>{article.title}</h1>
        <p className="article-detail__deck">{article.excerpt}</p>
        <div className="article-detail__metadata">
          <span>Format: {article.format}</span>
          <span>Published: {formatDate(article.date)}</span>
          {article.deck ? <span>Version: {article.deck.version}</span> : null}
        </div>
      </header>
      <div className="article-detail__body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.body}
        </ReactMarkdown>
      </div>
      <footer className="article-detail__footer">
        <p>
          Filed under <strong>{article.tags.join(" · ")}</strong>
        </p>
        <a className="text-link" href={articlePath(article.slug)}>
          Permanent link <span aria-hidden="true">↗</span>
        </a>
      </footer>
      {related.length > 0 ? (
        <section
          className="related-notes"
          aria-labelledby="related-notes-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Keep preparing</p>
            <h2 id="related-notes-title">Related notes</h2>
          </div>
          <div className="article-grid">
            {related.map((relatedArticle) => (
              <ArticleCard article={relatedArticle} key={relatedArticle.slug} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
