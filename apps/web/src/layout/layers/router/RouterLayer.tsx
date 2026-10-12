import { RouterProvider } from "react-router";

import type { RouterLayerProps } from "./types";

function RouterLayer({ router }: RouterLayerProps) {
  return <RouterProvider router={router} />;
}

export default RouterLayer;
