import { Link } from "react-router";

import copy from "@/content/en.json";
import { isPathActive } from "@/utils/route";

import type { SiteHeaderViewProps } from "./types";

function SiteHeaderView({ pathname }: SiteHeaderViewProps) {
  return (
    <header className="site-header">
      <p className="site-ticker">
        <span className="live-badge">{copy.site.live}</span>
        <span className="site-ticker__label">{copy.site.tickerLabel}</span>
        <span className="site-ticker__items">
          {copy.site.ticker.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </p>
      <div className="site-header__bar">
        <Link aria-label={copy.site.brandAriaLabel} className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            {copy.site.mark}
          </span>
          <span className="brand-plate">
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
      </div>
    </header>
  );
}

export default SiteHeaderView;
