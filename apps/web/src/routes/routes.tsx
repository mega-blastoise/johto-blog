import type { RouteObject } from "react-router";

import AppLayout from "@/layouts/AppLayout";

import { createLazyRoute } from "./lazy";

export function lazyRoutes(): RouteObject[] {
  return [
    {
      Component: AppLayout,
      children: [
        { index: true, lazy: createLazyRoute(() => import("@/pages/Home")) },
        {
          path: "posts/",
          lazy: createLazyRoute(() => import("@/pages/Posts")),
        },
        {
          path: "posts/:slug/",
          lazy: createLazyRoute(() => import("@/pages/Post")),
        },
        {
          path: "field/",
          lazy: createLazyRoute(() => import("@/pages/Field")),
        },
        {
          path: "about/",
          lazy: createLazyRoute(() => import("@/pages/About")),
        },
        { path: "*", lazy: createLazyRoute(() => import("@/pages/NotFound")) },
      ],
    },
  ];
}
