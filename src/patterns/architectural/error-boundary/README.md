# Pattern: Error Boundary

## Definition

An Error Boundary isolates failures in a child component or rendering subtree and displays fallback UI instead of allowing the entire interface to fail.

## Example

`createErrorBoundary` wraps a child render function, captures thrown errors, and delegates recovery UI to a fallback function that receives the error and a reset action.

## Trade-offs

Boundaries improve resilience and user recovery, but they can hide defects if fallback handling is too broad. Place them around meaningful UI sections and report captured errors to monitoring in production.

## Implementation

- `src/patterns/architectural/error-boundary/error-boundary-pattern.ts`
- `tests/patterns/architectural/error-boundary/error-boundary-pattern.test.ts`
