# Prototype Pattern

## Definition

Prototype creates new objects by cloning an existing, configured instance instead of constructing each object from scratch.

## Structure

- **Prototype:** `CampaignPrototype` stores a reusable campaign configuration.
- **Clone operation:** `clone` creates a new prototype with copied state.
- **Product:** `toCampaign` exposes an immutable campaign value.

## Example

A marketing system can configure a campaign template once, clone it for different audiences, and customize each copy independently.

## Trade-offs

### Advantages

- Reuses expensive or complex configuration.
- Keeps cloned objects independent from their source.
- Avoids coupling callers to detailed construction steps.

### Disadvantages

- Clone logic must correctly copy nested mutable state.
- Deep object graphs can make cloning more difficult.

## Interview answer

- **Definition:** creates objects by copying a prototype instance;
- **Structure:** a prototype with a clone operation and independently mutable copies;
- **Example:** cloning a campaign template for multiple audiences;
- **Trade-off:** efficient for complex objects, but nested state requires careful copying.

## Implementation

- [prototype-pattern.ts](./prototype-pattern.ts)
- `tests/patterns/creational/prototype/prototype-pattern.test.ts`
