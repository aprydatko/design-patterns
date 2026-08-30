# Pattern: Render Props

## Definition

Render Props is a technique where a component provides state and behavior to a caller-supplied render function. The provider owns reusable logic; the consumer controls the rendered result.

## Example

`createUserRenderProps` loads and selects users, then passes the resulting state and actions to the supplied `render` function. Different consumers can turn the same state into different outputs.

## Trade-offs

This provides strong reuse and flexible rendering, but deeply nested render functions can reduce readability. Hooks or dedicated components may be clearer when the behavior is shared in a single UI style.

## Implementation

- `src/patterns/architectural/render-props/render-props-pattern.ts`
- `tests/patterns/architectural/render-props/render-props-pattern.test.ts`
