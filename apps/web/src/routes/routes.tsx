import { Navigate, useParams, type RouteObject } from "react-router";

import AppLayout from "@/layouts/AppLayout";

import { createLazyRoute } from "./lazy";

/** /posts/:slug/ was the article URL before the journal moved to /journal/. */
function LegacyPostRedirect() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <Navigate replace to={`/journal/${slug}/`} />;
}

export function lazyRoutes(): RouteObject[] {
  return [
    {
      Component: AppLayout,
      children: [
        { index: true, lazy: createLazyRoute(() => import("@/pages/Home")) },
        {
          path: "decks/",
          lazy: createLazyRoute(() => import("@/pages/Decks")),
        },
        {
          path: "decks/:archetype/",
          lazy: createLazyRoute(() => import("@/pages/Deck")),
        },
        { path: "sets/", lazy: createLazyRoute(() => import("@/pages/Sets")) },
        {
          path: "sets/:code/",
          lazy: createLazyRoute(() => import("@/pages/Set")),
        },
        {
          path: "events/",
          lazy: createLazyRoute(() => import("@/pages/Events")),
        },
        {
          path: "events/:slug/",
          lazy: createLazyRoute(() => import("@/pages/Event")),
        },
        {
          path: "journal/",
          lazy: createLazyRoute(() => import("@/pages/Journal")),
        },
        {
          path: "journal/:slug/",
          lazy: createLazyRoute(() => import("@/pages/Post")),
        },
        {
          path: "about/",
          lazy: createLazyRoute(() => import("@/pages/About")),
        },
        { path: "posts/", element: <Navigate replace to="/journal/" /> },
        { path: "posts/:slug/", Component: LegacyPostRedirect },
        { path: "*", lazy: createLazyRoute(() => import("@/pages/NotFound")) },
      ],
    },
  ];
}
