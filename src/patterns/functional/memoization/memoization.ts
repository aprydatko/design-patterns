export type MemoizedFunction<Input, Result> = ((input: Input) => Result) & {
  clearCache: () => void;
  getCacheSize: () => number;
};

/**
 * Memoization caches a function result by input so repeated calls avoid
 * repeating the same calculation.
 */
export const memoize = <Input, Result>(
  operation: (input: Input) => Result,
): MemoizedFunction<Input, Result> => {
  const cache = new Map<Input, Result>();

  return Object.assign(
    (input: Input): Result => {
      if (cache.has(input)) {
        return cache.get(input) as Result;
      }

      const result = operation(input);
      cache.set(input, result);
      return result;
    },
    {
      clearCache: (): void => {
        cache.clear();
      },
      getCacheSize: (): number => cache.size,
    },
  );
};
