import { Link } from "react-router";

import copy from "@/content/en.json";

interface ErrorBoundaryViewProps {
  reset?: () => void;
}

function ErrorBoundaryView({ reset }: ErrorBoundaryViewProps) {
  return (
    <section
      className="page-intro page-intro--narrow error-state"
      aria-live="assertive"
    >
      <p className="eyebrow">{copy.common.errorEyebrow}</p>
      <h1>{copy.common.errorTitle}</h1>
      <p>{copy.common.errorDescription}</p>
      <div className="hero__actions">
        {reset ? (
          <button
            className="button button--primary"
            onClick={reset}
            type="button"
          >
            {copy.common.retry}
          </button>
        ) : null}
        <Link className="button button--quiet" to="/posts/">
          {copy.common.backToJournal}
        </Link>
      </div>
    </section>
  );
}

export default ErrorBoundaryView;
