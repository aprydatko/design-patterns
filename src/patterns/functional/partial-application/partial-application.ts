export type PartiallyApplied<RemainingArguments extends readonly unknown[], Result> = (
  ...remainingArguments: RemainingArguments
) => Result;

/**
 * Partial Application fixes selected arguments now and returns a function
 * that accepts the remaining arguments in one call.
 */
export const partialApplyFirst =
  <First, RemainingArguments extends readonly unknown[], Result>(
    operation: (first: First, ...remainingArguments: RemainingArguments) => Result,
    first: First,
  ): PartiallyApplied<RemainingArguments, Result> =>
  (...remainingArguments: RemainingArguments): Result =>
    operation(first, ...remainingArguments);
