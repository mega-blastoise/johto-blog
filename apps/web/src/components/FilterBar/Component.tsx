import { articleKinds, type ArticleKind } from "@prize-map/types";

import { kindLabels } from "@/lib/present";
import type { FeedFilters } from "@/types/site";

interface FilterBarProps extends FeedFilters {
  onKindChange: (kind: ArticleKind | "all") => void;
  onQueryChange: (query: string) => void;
}

export function FilterBar({
  kind,
  onKindChange,
  onQueryChange,
  query,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <label className="search-field">
        <span className="sr-only">Search reports</span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m20 20-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
        </svg>
        <input
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search notes"
          type="search"
          value={query}
        />
      </label>
      <div className="kind-filter" aria-label="Filter posts by type">
        <button
          aria-pressed={kind === "all"}
          className={
            kind === "all" ? "filter-chip filter-chip--active" : "filter-chip"
          }
          onClick={() => onKindChange("all")}
          type="button"
        >
          All
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
            {kindLabels[item]}
          </button>
        ))}
      </div>
    </div>
  );
}
