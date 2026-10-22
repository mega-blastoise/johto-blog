import { Link } from "react-router";

import { PrizeTrack } from "@/components/PrizeTrack";
import copy from "@/content/en.json";

function NotFoundView() {
  return (
    <section className="page-intro page-intro--narrow page-intro--missed">
      <p className="eyebrow">{copy.notFound.eyebrow}</p>
      <h1>{copy.notFound.title}</h1>
      <p>{copy.notFound.description}</p>
      <PrizeTrack label={copy.notFound.prizesLabel} taken={0} />
      <Link className="button button--primary" to="/posts/">
        {copy.notFound.cta} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default NotFoundView;
