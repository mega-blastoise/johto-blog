import { articleKinds } from "@prize-map/types";

import copy from "@/content/en.json";
import { articleKindLabel } from "@/utils/articlePresentation";

import type { FilterBarProps } from "./types";

function FilterBarView({
  kind,
  onKindChange,
  onQueryChange,
  query,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <label className="search-field">
        <span className="sr-only">{copy.posts.searchLabel}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m20 20-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
        </svg>
        <input
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={copy.posts.searchPlaceholder}
          type="search"
          value={query}
        />
      </label>
      <div className="kind-filter" aria-label={copy.posts.filterLabel}>
        <button
          aria-pressed={kind === "all"}
          className={
            kind === "all" ? "filter-chip filter-chip--active" : "filter-chip"
          }
          onClick={() => onKindChange("all")}
          type="button"
        >
          {copy.posts.allKinds}
        </button>
        {articleKinds.map((item) => (
          <button
            aria-pressed={kind === item}
            className={
              kind === item ? "filter-chip filter-chip--active" : "filter-chip"
            }
            key={item}
            onClick={() => onKindChange(item)}
            type="button"
          >
            {articleKindLabel(item)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBarView;
