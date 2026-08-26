# Strategy Pattern

## Definition

Strategy Pattern defines a family of interchangeable algorithms behind a common contract. A context delegates part of its behavior to the selected strategy instead of embedding every variation in conditional logic.

## Structure

- **Strategy:** `DiscountStrategy` describes how a subtotal is transformed.
- **Concrete strategies:** `noDiscount`, `createPercentageDiscount`, and `createFixedDiscount` provide different algorithms.
- **Context:** `createCheckout` uses whichever strategy the caller supplies.

## Example

An online checkout can apply a percentage promotion, a fixed voucher, or no discount based on the current campaign without changing its total-calculation code.

## Trade-offs

### Advantages

- Makes algorithms easy to replace and test independently.
- Avoids growing conditional branches in the context.
- Keeps each pricing rule focused on one responsibility.

### Disadvantages

- Adds extra objects or functions for simple variations.
- Callers need to understand which strategy is appropriate.
- The shared strategy contract may not fit every algorithm perfectly.

## Interview answer

- **Definition:** encapsulates interchangeable algorithms behind a common interface;
- **Structure:** a strategy contract, concrete strategies, and a context that delegates to one;
- **Example:** payment, sorting, validation, or pricing algorithms selected at runtime;
- **Trade-off:** improves extensibility and testability, but introduces more moving parts.

## Implementation

Links to the implementation and test:

- [strategy-pattern.ts](./strategy-pattern.ts)
- `tests/patterns/behavioral/strategy/strategy-pattern.test.ts`
