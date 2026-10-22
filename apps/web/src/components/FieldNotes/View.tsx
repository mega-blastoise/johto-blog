import { Link } from "react-router";

import { EnergySymbol } from "@/components/EnergySymbol";
import copy from "@/content/en.json";
import { formatMessage } from "@/utils/formatMessage";

import type { EnergyType } from "@/components/EnergySymbol";

// Bracket rounds advance through the energy palette: observe, read, act.
const roundEnergy: readonly EnergyType[] = ["water", "psychic", "fire"];

function FieldNotesView() {
  return (
    <section className="page-intro">
      <p className="eyebrow">{copy.field.eyebrow}</p>
      <h1>{copy.field.title}</h1>
      <p>{copy.field.description}</p>
      <ol className="field-notes__grid">
        {copy.field.steps.map((step, index) => {
          const energy = roundEnergy[index % roundEnergy.length] ?? "colorless";
          return (
            <li data-energy={energy} key={step.title}>
              <span className="field-notes__round">
                <EnergySymbol type={energy} />
                {formatMessage(copy.broadcast.round, {
                  round: String(index + 1).padStart(2, "0"),
                })}
              </span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </li>
          );
        })}
      </ol>
      <Link className="button button--primary" to="/posts/meta-brief-template/">
        {copy.field.templateCta} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default FieldNotesView;
