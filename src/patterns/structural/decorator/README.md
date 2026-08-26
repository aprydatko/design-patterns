# Decorator Pattern

## Definition

Decorator Pattern attaches additional behavior to an object by wrapping it with another object that follows the same contract. Decorators can be composed at runtime, allowing behavior to be extended without changing the original implementation.

## Structure

- **Component:** `Beverage` defines the operations clients use.
- **Concrete component:** `createCoffee` provides the base beverage.
- **Decorators:** `addMilk` and `addSugar` wrap a beverage and add to its description and cost.
- **Client:** callers can compose decorators in any supported order while retaining the same `Beverage` contract.

## Example

A coffee ordering system can add milk, sugar, syrups, or other options without creating a separate class for every possible combination.

## Trade-offs

### Advantages

- Adds features without modifying the wrapped object.
- Supports flexible runtime composition.
- Avoids a large inheritance hierarchy for combinations of behavior.

### Disadvantages

- Many wrappers can make debugging and object inspection harder.
- The order of decorators can affect the result.
- Each decorator adds another layer of indirection.

## Interview answer

- **Definition:** dynamically adds responsibilities to an object through wrapping;
- **Structure:** a shared component contract, a concrete component, and decorators that implement the same contract;
- **Example:** UI features, logging, caching, authorization, or configurable product options;
- **Trade-off:** flexible composition, but deeply wrapped objects can be harder to reason about.

## Implementation

Links to the implementation and test:

- [decorator-pattern.ts](./decorator-pattern.ts)
- `tests/patterns/structural/decorator/decorator-pattern.test.ts`
