# Pattern: Custom Hooks

## Definition

A Custom Hook extracts reusable stateful behavior into a composable function. The hook manages logic and state while the consuming component decides how to render the result.

## Example

`useUserList` owns user loading, selection, mapping, and errors. A UI component can call `getState()` and bind `load` and `selectUser` to its lifecycle and events.

## Trade-offs

Custom Hooks reduce duplication and keep components focused, but they couple the behavior to a hook-style lifecycle and can hide important state transitions if their contracts become too broad.

## Implementation

- `src/patterns/architectural/custom-hooks/custom-hooks-pattern.ts`
- `tests/patterns/architectural/custom-hooks/custom-hooks-pattern.test.ts`
