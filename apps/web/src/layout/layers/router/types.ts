import type { createBrowserRouter } from "react-router";

export interface RouterLayerProps {
  router: ReturnType<typeof createBrowserRouter>;
}
