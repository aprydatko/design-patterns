# Currying Pattern

## Definition

Currying transforms a function that accepts multiple arguments into a sequence of functions that each accept one argument. Each call returns the next function until all arguments are supplied and the final result is produced.

## Structure

- **Original operation:** accepts multiple arguments together;
- **Curried operation:** captures one argument in each nested function;
- **Final function:** invokes the original operation after receiving all arguments.

## Example

`curryThree` converts a three-argument calculation into a reusable pipeline. An application can configure a tax rate first, then a discount, and apply the resulting function to many subtotals.

## Trade-offs

### Advantages

- Supports incremental configuration and reuse;
- Makes data flow explicit through function composition;
- Preserves type safety with generic input and result types.

### Disadvantages

- Nested calls can be less readable for simple one-off operations;
- The fixed argument order can make an API rigid;
- Excessive currying may add unnecessary function allocations.

## Interview answer

- **Definition:** transforms a multi-argument function into nested unary functions;
- **Structure:** each function captures one argument and returns the next function;
- **Example:** configure a calculation once and reuse it for many inputs;
- **Trade-off:** composable and reusable, but potentially verbose for simple calls.

## Implementation

- [currying.ts](./currying.ts)
- `tests/patterns/functional/currying/currying.test.ts`
