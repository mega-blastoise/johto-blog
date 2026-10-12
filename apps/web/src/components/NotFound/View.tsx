import { Link } from "react-router";

import copy from "@/content/en.json";

function NotFoundView() {
  return (
    <section className="page-intro page-intro--narrow">
      <p className="eyebrow">{copy.notFound.eyebrow}</p>
      <h1>{copy.notFound.title}</h1>
      <p>{copy.notFound.description}</p>
      <Link className="button button--primary" to="/posts/">
        {copy.notFound.cta} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default NotFoundView;
