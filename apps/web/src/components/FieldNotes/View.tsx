import { Link } from "react-router";

import copy from "@/content/en.json";

function FieldNotesView() {
  return (
    <section className="page-intro">
      <p className="eyebrow">{copy.field.eyebrow}</p>
      <h1>{copy.field.title}</h1>
      <p>{copy.field.description}</p>
      <div className="field-notes__grid">
        {copy.field.steps.map((step, index) => (
          <section key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </section>
        ))}
      </div>
      <Link className="button button--primary" to="/posts/meta-brief-template/">
        {copy.field.templateCta} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default FieldNotesView;
