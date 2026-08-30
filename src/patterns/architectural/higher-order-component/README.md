# Pattern: Higher-Order Component

## Definition

A Higher-Order Component (HOC) is a function that takes a component and returns an enhanced component. It reuses behavior by injecting props or adding cross-cutting concerns around the original component.

## Example

`withUser` looks up a user and injects a profile DTO into `renderUserDetails`. The wrapped component only handles presentation and does not know about the service.

## Trade-offs

HOCs are reusable and composable, but can obscure prop ownership and make debugging or typing more difficult when many wrappers are stacked. Hooks and composition are often simpler for new React code.

## Implementation

- `src/patterns/architectural/higher-order-component/higher-order-component-pattern.ts`
- `tests/patterns/architectural/higher-order-component/higher-order-component-pattern.test.ts`
