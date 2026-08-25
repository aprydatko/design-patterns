# Module Pattern

## Definition

Module Pattern encapsulates state and internal functions in a closure and exposes only a public API. Consumers cannot modify the private data directly.

## Example

A counter feature module where other parts of the application can increment, decrement, or read the value, but cannot assign it directly.

## Trade-offs

The advantage is simple state encapsulation without classes. The drawback is that every factory call creates a new closure; for global shared state, consider Singleton or dependency injection separately.

## Interview answer

- **Definition:** hides private state and exposes a controlled API;
- **Structure:** private variables plus public functions with access to the closure;
- **Example:** a counter, cache, or feature service;
- **Trade-off:** convenient encapsulation, but every instance owns its own closure.

## Implementation

- [module-pattern.ts](./module-pattern.ts)
- `tests/patterns/creational/module/module-pattern.test.ts`
