# Memoization Pattern

## Definition

Memoization stores the result of a function call and reuses it when the same input appears again. It is effective for deterministic, expensive operations whose inputs are likely to repeat.

## Structure

- **Original operation:** performs the calculation;
- **Cache:** maps an input to its calculated result;
- **Memoized function:** checks the cache before invoking the original operation.

## Example

`memoize` wraps a single-input calculation and caches results in a `Map`. It can optimize repeated parsing, configuration lookup, or derived-value calculations while preserving the original function's return type.

## Trade-offs

### Advantages

- Avoids repeated expensive calculations;
- Keeps caching behavior separate from the original operation;
- `Map` supports values such as `undefined` and object identity without string-key collisions.

### Disadvantages

- Uses memory for stored inputs and results;
- Cached results become stale if the operation depends on changing external state;
- Cache keys use `Map` equality, so structurally identical objects are different keys.

## Interview answer

- **Definition:** caches function results and returns the cached value for repeated inputs;
- **Structure:** a wrapper checks a key-value cache before calling the original function;
- **Example:** cache repeated expensive calculations or lookups;
- **Trade-off:** improves speed at the cost of memory and possible stale data.

## Implementation

- [memoization.ts](./memoization.ts)
- `tests/patterns/functional/memoization/memoization.test.ts`
