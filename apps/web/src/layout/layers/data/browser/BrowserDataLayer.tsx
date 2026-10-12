import { QueryClientProvider } from "@tanstack/react-query";
import { memo, useState } from "react";

import { pipeline } from "@/utils/pipeline";

import type { PropsWithChildren } from "react";
import type { BrowserDataLayerProps } from "../types";

type Props = PropsWithChildren<BrowserDataLayerProps>;

function BrowserDataLayer({ children, client }: Props) {
  const [queryClient] = useState(client);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default pipeline(memo)(BrowserDataLayer) as ReturnType<
  typeof memo<typeof BrowserDataLayer>
>;
