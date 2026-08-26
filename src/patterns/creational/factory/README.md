# Factory Pattern

## Definition

Factory Pattern encapsulates the creation of related objects and returns an object through a shared contract. Callers choose what they need without depending on the concrete implementation.

## Structure

- **Product:** `Notification` defines the behavior available to callers.
- **Concrete products:** `EmailNotification` and `SmsNotification` implement that behavior.
- **Factory:** `createNotification` chooses and creates the requested concrete product.

## Example

A messaging service can create email or SMS notifications from configuration while the rest of the application only calls `send`.

## Trade-offs

### Advantages

- Keeps construction decisions in one place.
- Reduces coupling between callers and concrete classes.
- Makes adding a supported product straightforward.

### Disadvantages

- The factory grows as more product types are added.
- For a very small number of objects, the extra abstraction may be unnecessary.

## Interview answer

- **Definition:** encapsulates object creation behind a factory interface or function;
- **Structure:** a shared product contract, concrete products, and a creator that selects one;
- **Example:** selecting an email, SMS, or push notification provider from configuration;
- **Trade-off:** improves decoupling, but the factory can become a maintenance hotspot.

## Implementation

Links to the implementation and test:

- [factory-pattern.ts](./factory-pattern.ts)
- `tests/patterns/creational/factory/factory-pattern.test.ts`
