# Pattern: Compound Components

## Definition

Compound Components are a group of components that work together through shared parent state. The root coordinates behavior while child components provide a flexible, declarative interface.

## Example

`createCompoundTabs` is the root. Its `tabList`, `tab`, and `panel` functions represent coordinated child components that share the active tab.

## Trade-offs

This creates a flexible API and keeps related UI behavior together, but requires shared context/state and clear child contracts. It works well for tabs, menus, accordions, and selectable lists.

## Implementation

- `src/patterns/architectural/compound-components/compound-components-pattern.ts`
- `tests/patterns/architectural/compound-components/compound-components-pattern.test.ts`
