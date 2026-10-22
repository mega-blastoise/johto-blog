import { Link } from "react-router";

import { DialogueBox } from "@/components/DialogueBox";
import { UnownWord } from "@/components/UnownWord";
import copy from "@/content/en.json";

function NotFoundView() {
  return (
    <section className="page-intro page-intro--narrow">
      <UnownWord word={copy.notFound.unownWord} />
      <p className="eyebrow">{copy.notFound.eyebrow}</p>
      <h1>{copy.notFound.title}</h1>
      <DialogueBox className="page-intro__dialogue">
        <p>{copy.notFound.description}</p>
      </DialogueBox>
      <Link className="button button--primary" to="/posts/">
        {copy.notFound.cta} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default NotFoundView;
