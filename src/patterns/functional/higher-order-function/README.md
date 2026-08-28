# Higher-Order Function Pattern

## Definition

A higher-order function is a function that accepts another function as an argument, returns a function, or both. It allows behavior to be composed and reused without modifying the original operation.

## Structure

- **Original operation:** performs the core work;
- **Higher-order function:** accepts the original operation and creates a wrapper;
- **Returned function:** preserves the original contract while adding behavior.

## Example

`withCallCount` wraps any function and tracks how many times the returned function has been called. The same technique can add logging, authorization, timing, caching, or error handling around application operations.

## Trade-offs

### Advantages

- Encourages small, composable functions;
- Adds cross-cutting behavior without changing the wrapped function;
- Works with different argument and return types through generics.

### Disadvantages

- Nested wrappers can make control flow harder to follow;
- Wrappers can affect `this` and function metadata if those concerns are not handled explicitly.

## Interview answer

- **Definition:** a function that works with other functions by accepting or returning them;
- **Structure:** an original operation is passed to a function that returns a behavior-enhanced operation;
- **Example:** wrapping a request handler with logging or authorization;
- **Trade-off:** highly composable, but excessive wrapping can reduce readability.

## Implementation

- [higher-order-function.ts](./higher-order-function.ts)
- `tests/patterns/functional/higher-order-function/higher-order-function.test.ts`
