export type MiddlewareContext = Record<string, unknown>;

export type Middleware<Context extends MiddlewareContext> = (
  context: Context,
  next: () => Promise<void>,
) => Promise<void>;

export type MiddlewarePipeline<Context extends MiddlewareContext> = Readonly<{
  run: (context: Context) => Promise<Context>;
}>;

/**
 * Middleware composes cross-cutting behavior around a terminal operation.
 * Each middleware decides whether and when the next middleware runs.
 */
export const createMiddlewarePipeline = <Context extends MiddlewareContext>(
  middleware: readonly Middleware<Context>[],
  terminal: (context: Context) => Promise<void> = () => Promise.resolve(),
): MiddlewarePipeline<Context> => ({
  run: async (context: Context): Promise<Context> => {
    let index = -1;

    const dispatch = async (currentIndex: number): Promise<void> => {
      if (currentIndex <= index) {
        throw new Error('next() called multiple times');
      }

      index = currentIndex;
      const current = middleware[currentIndex];

      if (current === undefined) {
        await terminal(context);
        return;
      }

      await current(context, () => dispatch(currentIndex + 1));
    };

    await dispatch(0);
    return context;
  },
});
