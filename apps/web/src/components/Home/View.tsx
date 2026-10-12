import { Link } from "react-router";

import { ArticleCard } from "@/components/ArticleCard";
import { FormatBrief } from "@/components/FormatBrief";
import copy from "@/content/en.json";
import { selectHomePosts } from "@/services/Posts";
import { formatMessage } from "@/utils/formatMessage";

import type { HomeViewProps } from "./types";

function HomeView({ posts }: HomeViewProps) {
  const { featuredPosts, latestBrief, recentPosts } = selectHomePosts(posts);

  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__copy">
          <p className="eyebrow">{copy.home.hero.eyebrow}</p>
          <h1 id="home-title">
            {copy.home.hero.titleFirstLine}
            <br />
            {copy.home.hero.titleSecondLine}
          </h1>
          <p>{copy.home.hero.description}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#journal">
              {copy.home.hero.journalCta} <span aria-hidden="true">↓</span>
            </a>
            <Link className="button button--quiet" to="/about/">
              {copy.home.hero.protocolCta} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="hero__card" aria-label={copy.home.hero.standardLabel}>
          <span className="hero__card-label">
            {copy.home.hero.standardLabel}
          </span>
          <ol>
            {copy.home.hero.standard.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span> {item}
              </li>
            ))}
          </ol>
          <span className="hero__card-foot">
            {copy.home.hero.standardFootnote}
          </span>
        </div>
      </section>

      <FormatBrief latestBrief={latestBrief} />

      <section className="journal" id="journal" aria-labelledby="journal-title">
        <div className="section-heading section-heading--journal">
          <div>
            <p className="eyebrow">{copy.home.featured.eyebrow}</p>
            <h2 id="journal-title">{copy.home.featured.title}</h2>
          </div>
          <Link className="text-link" to="/posts/">
            {copy.home.featured.archiveCta} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="featured-grid">
          {featuredPosts.map((post, index) => (
            <ArticleCard
              article={post}
              key={post.slug}
              priority={index === 0}
            />
          ))}
        </div>
        {recentPosts.length > 0 ? (
          <div className="home-recent">
            <div className="section-heading">
              <p className="eyebrow">{copy.home.featured.recentTitle}</p>
            </div>
            <div className="article-grid">
              {recentPosts.map((post) => (
                <ArticleCard article={post} key={post.slug} />
              ))}
            </div>
          </div>
        ) : null}
        <p className="section-heading__aside">
          {formatMessage(copy.posts.archiveDetail, { count: posts.length })}
        </p>
      </section>
    </>
  );
}

export default HomeView;
