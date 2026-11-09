import { Link } from "react-router";

import copy from "@/content/en.json";
import { formatArticleDate, setPath } from "@/utils/articlePresentation";

import type { StaleBannerProps } from "./types";

// Splits the sentence around {set} so the set name can be a link.
const [beforeSet = "", afterSet = ""] = copy.stale.split("{set}");

function StaleBannerView({ set }: StaleBannerProps) {
  return (
    <p className="stale-banner" role="note">
      <span className="stale-banner__icon" aria-hidden="true">
        !
      </span>
      <span>
        {beforeSet}
        <Link to={setPath(set.code)}>{set.name}</Link>
        {afterSet.replace("{date}", formatArticleDate(set.legal))}
      </span>
    </p>
  );
}

export default StaleBannerView;
