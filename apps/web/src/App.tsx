import { memo } from "react";

import { DataLayer } from "@/layout/layers/data";
import { RouterLayer } from "@/layout/layers/router";
import { pipeline } from "@/utils/pipeline";

import type { DataLayerProps } from "@/layout/layers/data";
import type { RouterLayerProps } from "@/layout/layers/router";

interface AppProps {
  layers: {
    data: DataLayerProps;
    router: RouterLayerProps;
  };
}

function App({ layers }: AppProps) {
  return (
    <DataLayer {...layers.data}>
      <RouterLayer {...layers.router} />
    </DataLayer>
  );
}

export default pipeline(memo)(App) as ReturnType<typeof memo<typeof App>>;
