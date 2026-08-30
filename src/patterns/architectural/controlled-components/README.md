# Pattern: Controlled Components

## Definition

A controlled component receives its current value from a parent and reports changes through callbacks. The parent is the single source of truth; the component does not maintain a competing input state.

## Example

`createEmailFormController` owns the email value and validation state. `renderControlledEmailInput` only maps controlled props to a view model and forwards changes and submission.

## Trade-offs

This makes validation, synchronization, and testing predictable, but adds callback wiring and can cause more parent updates. It is useful when the parent needs to coordinate, validate, or persist the field value.

## Implementation

- `src/patterns/architectural/controlled-components/controlled-components-pattern.ts`
- `tests/patterns/architectural/controlled-components/controlled-components-pattern.test.ts`
