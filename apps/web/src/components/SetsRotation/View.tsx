import { Link } from "react-router";

import { ArticleCard } from "@/components/ArticleCard";
import { SeasonMap } from "@/components/SeasonMap";
import copy from "@/content/en.json";
import { postsForSet, selectTimeline } from "@/services/Catalog";
import { formatArticleDate, setPath } from "@/utils/articlePresentation";
import { formatMessage } from "@/utils/formatMessage";

import type { Article } from "@prize-map/types";
import type { SetsRotationViewProps } from "./types";

function PostGrid({
  posts,
  title,
  id,
}: {
  posts: Article[];
  title: string;
  id: string;
}) {
  return (
    <section className="sets-section" aria-labelledby={id}>
      <div className="section-heading">
        <h2 id={id}>{title}</h2>
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
  );
}

function SetsRotationView({ catalog, today }: SetsRotationViewProps) {
  const stops = selectTimeline(catalog.sets, catalog.rotations, today);
  const newestFirst = [...catalog.sets].reverse();

  return (
    <section className="journal" aria-labelledby="sets-title">
      <div className="section-heading">
        <p className="eyebrow">{copy.sets.eyebrow}</p>
        <h1 id="sets-title">{copy.sets.title}</h1>
        <p className="section-heading__description">{copy.sets.description}</p>
      </div>

      <SeasonMap stops={stops} />

      <section className="sets-section" aria-labelledby="set-list-title">
        <div className="section-heading">
          <h2 id="set-list-title">{copy.sets.setsTitle}</h2>
        </div>
        {newestFirst.length > 0 ? (
          <ol className="set-list">
            {newestFirst.map((set) => {
              const count = postsForSet(catalog.posts, set.code).length;
              return (
                <li
                  className={
                    set.legal > today ? "set-row set-row--upcoming" : "set-row"
                  }
                  key={set.code}
                >
                  <span className="set-row__code">{set.code}</span>
                  <Link className="set-row__name" to={setPath(set.code)}>
                    {set.name}
                  </Link>
                  <span className="set-row__dates">
                    {formatMessage(copy.sets.legal, {
                      date: formatArticleDate(set.legal),
                    })}
                    {set.regulationMark
                      ? ` · ${formatMessage(copy.sets.mark, { mark: set.regulationMark })}`
                      : ""}
                  </span>
                  <span className="set-row__count">
                    {formatMessage(copy.sets.postCount, { count })}
                  </span>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="empty-state">{copy.sets.setsEmpty}</p>
        )}
        {catalog.rotations.length > 0 ? (
          <ul className="rotation-notes">
            {catalog.rotations.map((rotation) => (
              <li key={rotation.season}>
                <strong>
                  {formatMessage(copy.sets.rotationStop, {
                    season: rotation.season,
                  })}
                  :
                </strong>{" "}
                {formatMessage(copy.sets.rotationMarks, {
                  marks: rotation.marks.join(", "),
                  date: formatArticleDate(rotation.date),
                })}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <PostGrid
        id="set-posts-title"
        posts={catalog.posts.filter((post) => post.kind === "set-release")}
        title={copy.sets.setPostsTitle}
      />
      <PostGrid
        id="rotation-posts-title"
        posts={catalog.posts.filter((post) => post.kind === "rotation")}
        title={copy.sets.rotationPostsTitle}
      />
    </section>
  );
}

export default SetsRotationView;
