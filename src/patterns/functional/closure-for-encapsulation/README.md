# Closure for Encapsulation Pattern

## Definition

A closure for encapsulation stores private state in a function's lexical scope and returns functions that can access it. Code outside the closure cannot directly read or replace that state; it must use the exposed operations.

## Structure

- **Private state:** lives in the factory's local scope;
- **Public operations:** closures over the private state and enforce its rules;
- **Returned API:** exposes behavior without exposing the state itself.

## Example

`createBankAccount` keeps the balance private and exposes deposit, withdrawal, and balance-reading operations. This is useful for small stateful services, browser widgets, and factories that need isolated instances without classes.

## Trade-offs

### Advantages

- Simple encapsulation using standard JavaScript behavior;
- Each factory call creates isolated state;
- Consumers interact through a controlled API.

### Disadvantages

- Each instance creates new functions and a closure;
- Private state is less discoverable and inspectable than a class property;
- Larger APIs can become harder to organize without a dedicated object or module boundary.

## Interview answer

- **Definition:** a closure preserves access to private variables after the outer function returns;
- **Structure:** local state plus returned functions that read or change it;
- **Example:** a bank account whose balance cannot be assigned directly;
- **Trade-off:** lightweight isolation, with per-instance closure overhead and less transparent internals.

## Implementation

- [closure-for-encapsulation.ts](./closure-for-encapsulation.ts)
- `tests/patterns/functional/closure-for-encapsulation/closure-for-encapsulation.test.ts`
