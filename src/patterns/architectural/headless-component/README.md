# Pattern: Headless Component

## Definition

A Headless Component encapsulates behavior and state while rendering no UI. Consumers receive the behavior contract and decide the markup, styling, accessibility details, and platform-specific presentation.

## Example

`createHeadlessCombobox` provides filtering, highlighting, opening, closing, and selection behavior. A consumer can render that state as any kind of combobox or command menu.

## Trade-offs

This maximizes presentation flexibility and reuse, but shifts rendering and accessibility responsibilities to each consumer. The behavior contract should document the state needed for correct UI.

## Implementation

- `src/patterns/architectural/headless-component/headless-component-pattern.ts`
- `tests/patterns/architectural/headless-component/headless-component-pattern.test.ts`
