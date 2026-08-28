export type UnaryFunction<Input, Output> = (input: Input) => Output;

/**
 * Function Composition combines unary functions into one operation. Functions
 * are applied from right to left, matching mathematical composition.
 */
export const compose =
  <Input, Inner, Middle, Result>(
    outer: UnaryFunction<Middle, Result>,
    middle: UnaryFunction<Inner, Middle>,
    inner: UnaryFunction<Input, Inner>,
  ): UnaryFunction<Input, Result> =>
  (input: Input): Result =>
    outer(middle(inner(input)));
