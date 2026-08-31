# Outbox Pattern

## Definition

Outbox reliably delivers events created by a business operation. The operation writes its state change and an outbox message in the same database transaction; a separate publisher later sends pending messages and removes them only after successful delivery.

## Structure

- **Business transaction** — atomically changes domain state and adds an outbox message.
- **Outbox store** — durably holds messages that still need publishing.
- **Publisher** — periodically reads pending messages and sends them.
- **Retry policy** — leaves failed messages pending for a later attempt.

## Example

When an order is created, the order row and `OrderCreated` event are committed together. A worker publishes that event to a message broker, ensuring consumers are not notified about an order that was never committed.

## Trade-offs

### Advantages

- Prevents the dual-write problem between a database and message broker.
- Preserves events through temporary broker or worker failures.
- Works with ordinary database transactions.

### Disadvantages

- Adds storage, cleanup, and background publishing work.
- At-least-once delivery means consumers must be idempotent.
- Multiple workers need claiming or locking to avoid duplicate publication.

## Interview answer

- **Definition:** Store an event with the business change, then publish it asynchronously from durable storage.
- **Structure:** Transaction, outbox store, publisher, and retry policy.
- **Example:** Publishing `OrderCreated` after committing an order.
- **Trade-off:** It solves dual writes, but introduces eventual consistency and at-least-once delivery.

## Implementation

Links to the implementation and test:

- `src/patterns/backend/outbox/outbox-pattern.ts`
- `tests/patterns/backend/outbox/outbox-pattern.test.ts`
