import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ArticleCard } from "@/components/ArticleCard";
import { Decklist } from "@/components/Decklist";
import { DialogueBox } from "@/components/DialogueBox";
import { MatchupTable } from "@/components/MatchupTable";
import { NotFoundView } from "@/components/NotFound";
import { StaleBanner } from "@/components/StaleBanner";
import copy from "@/content/en.json";
import { findSet, selectNewerSet, selectSetLegalOn } from "@/services/Catalog";
import {
  articleKindLabel,
  articlePath,
  deckPath,
  eventPath,
  formatArticleDate,
  formatLabel,
  setPath,
} from "@/utils/articlePresentation";
import { formatMessage } from "@/utils/formatMessage";

import type { Article } from "@prize-map/types";
import type { Components } from "react-markdown";
import type { Catalog } from "@/services/Catalog";
import type { ArticleViewProps } from "./types";

/** Swaps the post's ```decklist fence for the rendered list with its copy button. */
function markdownComponents(article: Article): Components {
  return {
    pre({ children, node, ...props }) {
      const code = node?.children[0];
      const className =
        code?.type === "element" ? code.properties.className : undefined;
      if (
        article.decklist &&
        Array.isArray(className) &&
        className.includes("language-decklist")
      ) {
        return (
          <Decklist
            decklist={article.decklist}
            version={article.deck?.version}
          />
        );
      }
      return <pre {...props}>{children}</pre>;
    },
  };
}

/** Links from the post to whatever it is about: a deck, a set, an event, a rotation. */
function SubjectLinks({
  article,
  catalog,
}: {
  article: Article;
  catalog: Catalog;
}) {
  const links: { to: string; label: string }[] = [];
  if (article.deck) {
    const deck = catalog.decks.find(
      (candidate) => candidate.slug === article.deck?.archetype,
    );
    links.push({
      to: deckPath(article.deck.archetype),
      label: `${copy.article.deckEntry}: ${deck?.name ?? article.deck.archetype}`,
    });
  }
  if (article.set) {
    const set = findSet(catalog.sets, article.set);
    links.push({
      to: setPath(article.set),
      label: formatMessage(copy.article.setLink, {
        name: set?.name ?? article.set,
      }),
    });
  }
  if (article.event) {
    const event = catalog.events.find(
      (candidate) => candidate.slug === article.event,
    );
    links.push({
      to: eventPath(article.event),
      label: formatMessage(copy.article.eventLink, {
        name: event?.name ?? article.event,
      }),
    });
  }
  if (article.rotation !== undefined) {
    links.push({
      to: "/sets/",
      label: formatMessage(copy.article.rotationLink, {
        season: article.rotation,
      }),
    });
  }
  if (links.length === 0) return null;
  return (
    <p className="subject-links">
      {links.map((link) => (
        <Link className="text-link" key={link.to} to={link.to}>
          {link.label} <span aria-hidden="true">→</span>
        </Link>
      ))}
    </p>
  );
}

function ArticleView({
  article,
  catalog,
  relatedPosts,
  today,
}: ArticleViewProps) {
  if (!article) return <NotFoundView />;

  const newerSet = selectNewerSet(article, catalog.sets, today);
  const writtenWith = selectSetLegalOn(catalog.sets, article.updated);

  return (
    <article className="article-detail">
      <Link className="back-link" to="/journal/">
        <span aria-hidden="true">←</span> {copy.common.backToJournal}
      </Link>
      <header className="article-detail__header">
        <div className="article-card__eyebrow">
          <span className={`type-pill type-pill--${article.kind}`}>
            {articleKindLabel(article.kind)}
          </span>
          <time dateTime={article.updated}>
            {formatMessage(copy.common.updated, {
              date: formatArticleDate(article.updated),
            })}
          </time>
        </div>
        <h1>{article.title}</h1>
        <DialogueBox className="article-detail__deck">
          <p>{article.excerpt}</p>
        </DialogueBox>
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
          {writtenWith ? (
            <span>
              {formatMessage(copy.article.writtenWith, {
                set: writtenWith.code,
              })}
            </span>
          ) : null}
        </div>
        <SubjectLinks article={article} catalog={catalog} />
        {newerSet ? <StaleBanner set={newerSet} /> : null}
      </header>
      {article.kind === "deck-build" ? (
        <section
          className="glance glance--article"
          aria-labelledby="glance-title"
        >
          <h2 className="glance__title" id="glance-title">
            {copy.article.atAGlance}
          </h2>
          <MatchupTable
            counters={article.counters}
            decks={catalog.decks}
            matchups={article.matchups}
          />
        </section>
      ) : null}
      <div className="article-detail__body">
        <ReactMarkdown
          components={markdownComponents(article)}
          remarkPlugins={[remarkGfm]}
        >
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
