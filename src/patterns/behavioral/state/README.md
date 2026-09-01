# State Pattern

## Definition

State allows an object to alter its behavior when its internal state changes, avoiding a large conditional state machine in the context.

## Structure

- **Context:** `Order` exposes operations and delegates them to its current state.
- **State:** `OrderState` defines the operations that vary by status.
- **Concrete states:** pending, paid, shipped, and cancelled states implement valid transitions and errors.

## Example

An order changes behavior as it moves from pending to paid, shipped, or cancelled. Each state controls which operations are allowed.

## Trade-offs

### Advantages

- Encapsulates state-specific behavior.
- Makes transitions and invalid operations explicit.
- Reduces conditional logic in the context.

### Disadvantages

- Adds a class for each meaningful state.
- State transitions can be harder to trace across multiple classes.

## Interview answer

- **Definition:** changes an object’s behavior based on its current state;
- **Structure:** context, state interface, and concrete state objects;
- **Example:** enforcing valid order lifecycle transitions;
- **Trade-off:** improves extensibility, but increases the number of collaborating classes.

## Implementation

- [state-pattern.ts](./state-pattern.ts)
- `tests/patterns/behavioral/state/state-pattern.test.ts`
