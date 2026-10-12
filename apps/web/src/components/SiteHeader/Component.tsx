import type { Route } from "@/types/site";

interface SiteHeaderProps {
  route: Route;
}

const navItems = [
  { href: "/", label: "Journal", page: "home" },
  { href: "/field/", label: "Field Notes", page: "field" },
  { href: "/about/", label: "Protocol", page: "about" },
] as const;

export function SiteHeader({ route }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Prize Map home">
        <span className="brand-mark" aria-hidden="true">
          PM
        </span>
        <span>
          <span className="brand-name">Prize Map</span>
          <span className="brand-subtitle">Competitive Pokémon TCG</span>
        </span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            aria-current={route.page === item.page ? "page" : undefined}
            className={
              route.page === item.page
                ? "site-nav__link site-nav__link--active"
                : "site-nav__link"
            }
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
