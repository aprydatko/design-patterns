# Abstract Factory Pattern

## Definition

Abstract Factory provides an interface for creating families of related objects without coupling callers to their concrete classes.

## Structure

- **Abstract products:** `Notification` describes the behavior of every notification.
- **Concrete products:** email and SMS confirmations and reminders implement that behavior.
- **Abstract factory:** `NotificationFactory` creates a confirmation and a reminder.
- **Concrete factories:** `EmailNotificationFactory` and `SmsNotificationFactory` create compatible product families.

## Example

A notification service can select an email or SMS family from configuration. The service then creates confirmations and reminders through the same factory contract.

## Trade-offs

### Advantages

- Keeps related products consistent with one another.
- Hides concrete implementations from clients.
- Makes switching an entire product family straightforward.

### Disadvantages

- Adding a new product type requires updating every concrete factory.
- Adds more abstractions than a simple factory.

## Interview answer

- **Definition:** creates families of related objects through a common factory contract;
- **Structure:** abstract factory, concrete factories, abstract products, and concrete products;
- **Example:** selecting a matching email or SMS set of notification components;
- **Trade-off:** supports consistent families, but adding product variants can be expensive.

## Implementation

- [abstract-factory-pattern.ts](./abstract-factory-pattern.ts)
- `tests/patterns/creational/abstract-factory/abstract-factory-pattern.test.ts`
