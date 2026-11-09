import { DeckCard } from "@/components/DeckCard";
import copy from "@/content/en.json";
import { selectDeckEntries, selectNewerSet } from "@/services/Catalog";
import { formatMessage } from "@/utils/formatMessage";

import type { DeckDexViewProps } from "./types";

function DeckDexView({ catalog, today }: DeckDexViewProps) {
  const entries = selectDeckEntries(catalog.decks, catalog.posts);
  const written = entries.filter((entry) => entry.latest).length;

  return (
    <section className="journal" aria-labelledby="dex-title">
      <div className="section-heading section-heading--journal">
        <div>
          <p className="eyebrow">{copy.decks.eyebrow}</p>
          <h1 id="dex-title">{copy.decks.title}</h1>
          <p className="section-heading__description">
            {copy.decks.description}
          </p>
        </div>
        <p className="section-heading__aside">
          {formatMessage(copy.decks.count, { written, total: entries.length })}
        </p>
      </div>
      <div className="dex-grid">
        {entries.map((entry) => (
          <DeckCard
            entry={entry}
            key={entry.deck.slug}
            newerSet={
              entry.latest
                ? selectNewerSet(entry.latest, catalog.sets, today)
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}

export default DeckDexView;
