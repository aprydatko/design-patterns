export type CountedFunction<Arguments extends readonly unknown[], Result> = ((
  ...arguments_: Arguments
) => Result) & {
  getCallCount: () => number;
};

/**
 * Higher-Order Function Pattern uses functions as values by accepting a
 * function and returning a new function with additional behavior.
 */
export const withCallCount = <Arguments extends readonly unknown[], Result>(
  operation: (...arguments_: Arguments) => Result,
): CountedFunction<Arguments, Result> => {
  let callCount = 0;

  return Object.assign(
    (...arguments_: Arguments): Result => {
      callCount += 1;
      return operation(...arguments_);
    },
    {
      getCallCount: (): number => callCount,
    },
  );
};
