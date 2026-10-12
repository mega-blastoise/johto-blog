import type { Route } from "@/types/site";

export function getRoute(pathname = window.location.pathname): Route {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return { page: "home" };
  if (segments.length === 1 && segments[0] === "field")
    return { page: "field" };
  if (segments.length === 1 && segments[0] === "about")
    return { page: "about" };
  if (segments.length === 2 && segments[0] === "posts" && segments[1]) {
    return { page: "article", slug: segments[1] };
  }

  return { page: "not-found" };
}

export function articlePath(slug: string): string {
  return `/posts/${slug}/`;
}
