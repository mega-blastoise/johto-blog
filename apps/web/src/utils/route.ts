export function isPathActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === href;
  return pathname.startsWith(href);
}
