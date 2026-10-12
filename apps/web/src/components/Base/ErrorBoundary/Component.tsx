import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import ErrorBoundaryView from "./View";

import type { PropsWithChildren } from "react";

function ErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorBoundaryView reset={resetErrorBoundary} />
      )}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;
