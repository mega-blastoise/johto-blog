import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Loader } from "@/components/Base/Loader";

import ErrorBoundaryView from "../ErrorBoundary/View";

import type { SuspenseEnabledQueryProps } from "./types";

function SuspenseEnabledQuery({
  children,
  placeholder = <Loader />,
}: SuspenseEnabledQueryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorBoundaryView reset={resetErrorBoundary} />
          )}
          onReset={reset}
        >
          <Suspense fallback={placeholder}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default SuspenseEnabledQuery;
