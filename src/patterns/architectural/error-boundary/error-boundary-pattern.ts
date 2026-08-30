export type ErrorBoundaryState = Readonly<{
  hasError: boolean;
  error: Error | undefined;
}>;

export type ErrorBoundaryFallback<Output> = (error: Error, reset: () => void) => Output;

export type ErrorBoundary<Output> = Readonly<{
  render: () => Output;
  reset: () => void;
  getState: () => ErrorBoundaryState;
}>;

const normalizeError = (cause: unknown): Error =>
  cause instanceof Error ? cause : new Error('Unexpected rendering error');

/**
 * An Error Boundary isolates failures from a child render function and turns
 * them into recoverable fallback output instead of propagating the exception.
 */
export const createErrorBoundary = <Output>(
  child: () => Output,
  fallback: ErrorBoundaryFallback<Output>,
): ErrorBoundary<Output> => {
  let state: ErrorBoundaryState = { hasError: false, error: undefined };

  const reset = (): void => {
    state = { hasError: false, error: undefined };
  };

  return {
    render: (): Output => {
      if (state.hasError && state.error !== undefined) {
        return fallback(state.error, reset);
      }

      try {
        return child();
      } catch (cause: unknown) {
        const error = normalizeError(cause);
        state = { hasError: true, error };
        return fallback(error, reset);
      }
    },
    reset,
    getState: (): ErrorBoundaryState => state,
  };
};
