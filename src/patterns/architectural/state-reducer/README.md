# Pattern: State Reducer

## Definition

The State Reducer Pattern lets a consumer customize a component's state transitions by supplying a reducer. The component provides sensible defaults while callers can override behavior for a specific use case.

## Example

`counterReducer` defines normal counter transitions. `createStateReducerController` accepts a replacement reducer, allowing a consumer to cap the count, add analytics, or change reset behavior without modifying the controller.

## Trade-offs

This provides powerful customization and keeps transitions explicit, but exposes internal state design and increases the API surface. Keep actions and state focused so overrides remain understandable.

## Implementation

- `src/patterns/architectural/state-reducer/state-reducer-pattern.ts`
- `tests/patterns/architectural/state-reducer/state-reducer-pattern.test.ts`
