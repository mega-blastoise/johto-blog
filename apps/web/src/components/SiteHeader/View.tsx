import { Link } from "react-router";

import copy from "@/content/en.json";
import { isPathActive } from "@/utils/route";

import type { SiteHeaderViewProps } from "./types";

function SiteHeaderView({ pathname }: SiteHeaderViewProps) {
  return (
    <header className="site-header">
      <Link aria-label={copy.site.brandAriaLabel} className="brand" to="/">
        <span className="brand-mark" aria-hidden="true">
          {copy.site.mark}
        </span>
        <span>
          <span className="brand-name">{copy.site.name}</span>
          <span className="brand-subtitle">{copy.site.descriptor}</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label={copy.site.navigationLabel}>
        {copy.site.navigation.map((item) => {
          const isActive = isPathActive(pathname, item.href);
          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "site-nav__link site-nav__link--active"
                  : "site-nav__link"
              }
              key={item.href}
              to={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default SiteHeaderView;
