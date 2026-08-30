# Pattern: Optimistic UI

## Definition

Optimistic UI updates the interface immediately with the expected result instead of waiting for a remote operation. The operation later confirms the value or rolls the UI back when it fails.

## Example

`createOptimisticController` applies an optimistic value, tracks pending state, confirms the server result, and restores the previous value with an error when the mutation rejects.

## Trade-offs

This makes interactions feel fast, but requires rollback handling and careful treatment of concurrent mutations. Use it when failures are recoverable and the expected result is sufficiently predictable.

## Implementation

- `src/patterns/architectural/optimistic-ui/optimistic-ui-pattern.ts`
- `tests/patterns/architectural/optimistic-ui/optimistic-ui-pattern.test.ts`
