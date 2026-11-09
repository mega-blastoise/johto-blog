import { useId } from "react";

import copy from "@/content/en.json";
import { formatMessage } from "@/utils/formatMessage";

import type { DecklistViewProps } from "./types";

function DecklistView({
  copyState,
  decklist,
  onCopy,
  version,
}: DecklistViewProps) {
  const titleId = useId();
  const buttonLabel =
    copyState === "copied" ? copy.decklist.copied : copy.decklist.copy;

  return (
    <section className="decklist" aria-labelledby={titleId}>
      <header className="decklist__header">
        <div>
          <h2 className="decklist__title" id={titleId}>
            {copy.decklist.title}
            {version ? (
              <span className="decklist__version">{version}</span>
            ) : null}
          </h2>
          <p className="decklist__summary">
            {decklist.sections
              .map(
                (section) =>
                  `${copy.decklist.sections[section.kind]} ${section.count}`,
              )
              .join(" · ")}
            {" = "}
            {formatMessage(copy.decklist.total, { count: decklist.total })}
          </p>
        </div>
        <button
          className="button button--primary decklist__copy"
          onClick={onCopy}
          type="button"
        >
          {buttonLabel}
        </button>
      </header>
      <p className="sr-only" aria-live="polite">
        {copyState === "copied" ? copy.decklist.copied : ""}
        {copyState === "failed" ? copy.decklist.copyFailed : ""}
      </p>
      <div className="decklist__sections">
        {decklist.sections.map((section) => (
          <section className="decklist__section" key={section.kind}>
            <h3 className="decklist__section-title">
              {copy.decklist.sections[section.kind]}
              <span>{section.count}</span>
            </h3>
            <ul className="decklist__cards">
              {section.cards.map((card, index) => (
                <li
                  className="decklist__card"
                  key={`${card.name}-${card.set ?? ""}-${index}`}
                >
                  <span className="decklist__count">{card.count}</span>
                  <span className="decklist__name">{card.name}</span>
                  {card.set ? (
                    <span className="decklist__printing">
                      {card.set} {card.number}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <details className="decklist__export" open={copyState === "failed"}>
        <summary>
          {copyState === "failed"
            ? copy.decklist.copyFailed
            : copy.decklist.exportLabel}
        </summary>
        <pre>{decklist.export}</pre>
      </details>
    </section>
  );
}

export default DecklistView;
