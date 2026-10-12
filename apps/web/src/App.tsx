import { useMemo, useState } from "react";

import { posts } from "@prize-map/content-data";
import type { Article as ArticleRecord, ArticleKind } from "@prize-map/types";

import { Article } from "@/components/Article";
import { ArticleCard } from "@/components/ArticleCard";
import { FilterBar } from "@/components/FilterBar";
import { FormatBrief } from "@/components/FormatBrief";
import { SiteHeader } from "@/components/SiteHeader";
import { getRoute } from "@/lib/routes";
import type { FeedFilters } from "@/types/site";

function Home({ allPosts }: { allPosts: readonly ArticleRecord[] }) {
  const [filters, setFilters] = useState<FeedFilters>({
    kind: "all",
    query: "",
  });
  const featuredPosts = allPosts.filter((post) => post.featured);
  const latestBrief = allPosts.find((post) => post.kind === "meta-brief");
  const matchingPosts = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();
    return allPosts.filter((post) => {
      const matchesKind = filters.kind === "all" || post.kind === filters.kind;
      const haystack = [
        post.title,
        post.excerpt,
        ...post.tags,
        post.kind,
        post.format,
      ]
        .join(" ")
        .toLowerCase();
      return (
        matchesKind && (!normalizedQuery || haystack.includes(normalizedQuery))
      );
    });
  }, [allPosts, filters]);

  function setKind(kind: ArticleKind | "all"): void {
    setFilters((current) => ({ ...current, kind }));
  }

  function setQuery(query: string): void {
    setFilters((current) => ({ ...current, query }));
  }

  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__copy">
          <p className="eyebrow">Competitive Pokémon TCG journal</p>
          <h1 id="home-title">
            Better notes.
            <br />
            Cleaner decisions.
          </h1>
          <p>
            A tightly kept record of deck versions, matchup plans, and format
            reads for players who want their testing to survive contact with a
            tournament room.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#journal">
              Read the journal <span aria-hidden="true">↓</span>
            </a>
            <a className="button button--quiet" href="/about/">
              The protocol <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="hero__card" aria-label="Prize Map editorial standard">
          <span className="hero__card-label">Every post carries</span>
          <ol>
            <li>
              <span>01</span> A format boundary
            </li>
            <li>
              <span>02</span> A versioned decision
            </li>
            <li>
              <span>03</span> A next test
            </li>
          </ol>
          <span className="hero__card-foot">Play the room, not the hype.</span>
        </div>
      </section>

      <FormatBrief latestBrief={latestBrief} />

      <section className="journal" id="journal" aria-labelledby="journal-title">
        <div className="section-heading section-heading--journal">
          <div>
            <p className="eyebrow">The journal</p>
            <h2 id="journal-title">
              Decks, field reads, and the decisions behind them.
            </h2>
          </div>
          <p className="section-heading__aside">
            {allPosts.length} authored notes · markdown-first · versioned
          </p>
        </div>
        <FilterBar
          kind={filters.kind}
          onKindChange={setKind}
          onQueryChange={setQuery}
          query={filters.query}
        />
        {filters.kind === "all" && !filters.query ? (
          <div className="featured-grid">
            {featuredPosts.map((post, index) => (
              <ArticleCard
                article={post}
                key={post.slug}
                priority={index === 0}
              />
            ))}
          </div>
        ) : null}
        <div className="article-grid" aria-live="polite">
          {matchingPosts.map((post) => (
            <ArticleCard article={post} key={post.slug} />
          ))}
        </div>
        {matchingPosts.length === 0 ? (
          <p className="empty-state">
            No notes match that field read. Reset the filters and try another
            term.
          </p>
        ) : null}
      </section>
    </>
  );
}

function FieldNotes() {
  return (
    <section className="page-intro">
      <p className="eyebrow">Field notes</p>
      <h1>A format read is a timestamped argument.</h1>
      <p>
        This page is reserved for live, source-backed meta snapshots. The
        starter workspace deliberately makes no unverified claim about today’s
        Standard field—competitive information needs a source window before it
        needs a hot take.
      </p>
      <div className="field-notes__grid">
        <section>
          <span>01</span>
          <h2>Snapshot</h2>
          <p>
            Record the format, events observed, sample window, and update date.
          </p>
        </section>
        <section>
          <span>02</span>
          <h2>Read</h2>
          <p>Separate results you saw from the decision you infer from them.</p>
        </section>
        <section>
          <span>03</span>
          <h2>Action</h2>
          <p>
            End with the deck, tech, or matchup test the field read changes.
          </p>
        </section>
      </div>
      <a className="button button--primary" href="/posts/meta-brief-template/">
        Open the meta brief template <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

function About() {
  return (
    <section className="page-intro page-intro--narrow">
      <p className="eyebrow">The protocol</p>
      <h1>Make a competitive journal that remains useful after the event.</h1>
      <p>
        Prize Map is a static, Markdown-authored publishing system for a serious
        Pokémon Trading Card Game player. It is built to preserve list versions,
        timestamp metagame observations, and turn testing into advice that can
        be checked later.
      </p>
      <div className="protocol-list">
        <div>
          <strong>01</strong>
          <span>
            <b>Own the source.</b> Posts live as validated Markdown in the
            repository, not as opaque CMS records.
          </span>
        </div>
        <div>
          <strong>02</strong>
          <span>
            <b>Keep the conditions.</b> Format, date, deck version, and
            confidence are first-class editorial context.
          </span>
        </div>
        <div>
          <strong>03</strong>
          <span>
            <b>Publish the next decision.</b> The value is what you will test,
            play, or cut next—not a retrospective victory lap.
          </span>
        </div>
      </div>
      <p className="fine-print">
        Pokémon and Pokémon Trading Card Game are trademarks of their respective
        owners. Prize Map is an independent fan publication.
      </p>
    </section>
  );
}

function NotFound() {
  return (
    <section className="page-intro page-intro--narrow">
      <p className="eyebrow">404 · Missed the line</p>
      <h1>That note is not in this deck.</h1>
      <p>It may have moved, or it has not been published yet.</p>
      <a className="button button--primary" href="/">
        Back to the journal <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

export function App() {
  const route = getRoute();
  const article =
    route.page === "article"
      ? posts.find((post) => post.slug === route.slug)
      : undefined;

  return (
    <div className="site-shell">
      <SiteHeader route={route} />
      <main>
        {route.page === "home" ? <Home allPosts={posts} /> : null}
        {route.page === "field" ? <FieldNotes /> : null}
        {route.page === "about" ? <About /> : null}
        {route.page === "article" && article ? (
          <Article allPosts={posts} article={article} />
        ) : null}
        {route.page === "not-found" ||
        (route.page === "article" && !article) ? (
          <NotFound />
        ) : null}
      </main>
      <footer className="site-footer">
        <span>Prize Map · Competitive Pokémon TCG</span>
        <span>Notes for the next round.</span>
      </footer>
    </div>
  );
}
