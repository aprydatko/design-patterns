# Observer / Pub-Sub Pattern

## Definition

Observer Pattern defines a one-to-many relationship where a subject notifies interested observers when its state changes. In a Pub-Sub variation, publishers and subscribers communicate through a channel so they do not need to know about each other directly.

## Structure

- **Subject / channel:** `MessageChannel` stores subscribers and publishes messages.
- **Observer / subscriber:** `MessageSubscriber` is a callback that reacts to a message.
- **Subscription:** `subscribe` registers a callback and returns an unsubscribe function.
- **Publisher:** any caller with the channel can call `publish` without knowing its subscribers.

## Example

A frontend feature can publish a `cart-updated` message while analytics, the cart badge, and a recommendation panel subscribe independently.

## Trade-offs

### Advantages

- Reduces coupling between the publisher and its consumers.
- Allows multiple consumers to react to the same event.
- Subscribers can be added or removed without changing the publisher.

### Disadvantages

- Event flow can be harder to trace than a direct function call.
- Subscribers must be removed when their lifecycle ends to avoid leaks.
- A slow subscriber can delay other subscribers when notifications are synchronous.

## Interview answer

- **Definition:** notifies multiple observers when a subject changes;
- **Structure:** a subject, subscribers, and a subscription or notification mechanism;
- **Example:** UI components reacting to application events or a domain event bus;
- **Trade-off:** flexible decoupling, but implicit event flow increases debugging complexity.

## Implementation

Links to the implementation and test:

- [observer-pattern.ts](./observer-pattern.ts)
- `tests/patterns/behavioral/observer/observer-pattern.test.ts`
