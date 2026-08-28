export type CurriedThree<First, Second, Third, Result> = (
  first: First,
) => (second: Second) => (third: Third) => Result;

/**
 * Currying transforms one multi-argument function into nested unary
 * functions, allowing arguments to be supplied one at a time.
 */
export const curryThree =
  <First, Second, Third, Result>(
    operation: (first: First, second: Second, third: Third) => Result,
  ): CurriedThree<First, Second, Third, Result> =>
  (first: First) =>
  (second: Second) =>
  (third: Third): Result =>
    operation(first, second, third);
