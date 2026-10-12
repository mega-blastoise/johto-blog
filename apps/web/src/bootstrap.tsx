import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";

import App from "@/App";
import { createQueryClient } from "@/config/queryClient";
import { lazyRoutes } from "@/routes/routes";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root application element");
}

const queryClient = createQueryClient();
const router = createBrowserRouter(lazyRoutes());

createRoot(rootElement).render(
  <App
    layers={{
      data: { browser: { client: queryClient } },
      router: { router },
    }}
  />,
);
