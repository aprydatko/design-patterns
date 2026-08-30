# Pattern: Container / Presentational

## Definition

Container / Presentational separates data and behavior from rendering. The container coordinates model access and state; the presentational component receives props and describes the UI without knowing where data came from.

## Example

`createUserListContainer` loads users from a service and passes DTOs to `renderUserList`. The latter is a pure function and can be replaced by a React component, a test double, or another rendering target.

## Trade-offs

This improves reuse and testability, but can create extra wiring and overly small components. Keep the split when the data orchestration and visual rendering have different reasons to change.

## Implementation

- `src/patterns/architectural/container-presentational/container-presentational-pattern.ts`
- `tests/patterns/architectural/container-presentational/container-presentational-pattern.test.ts`
