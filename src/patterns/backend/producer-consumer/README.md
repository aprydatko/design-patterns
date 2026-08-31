# Producer / Consumer Pattern

## Definition

Producer / Consumer decouples work creation from work processing through a queue. Producers add work, while one or more consumers remove and process it independently, allowing the two sides to run at different rates.

## Structure

- **Producer** — creates work items and places them in the queue.
- **Queue** — buffers work and applies a capacity policy.
- **Consumer** — waits for and processes available items.
- **Backpressure** — slows or rejects producers when consumers cannot keep up.

## Example

An image-processing API can enqueue upload jobs while worker processes consume them. A bounded queue prevents a traffic spike from exhausting memory.

## Trade-offs

### Advantages

- Smooths bursts and decouples producer and consumer lifecycles.
- Allows consumers to scale independently.
- Bounded queues make overload visible through backpressure.

### Disadvantages

- Queue capacity and worker count need tuning.
- Items can be delayed or lost if the queue is in memory and the process crashes.
- Consumers need retry, acknowledgment, and failure handling in production systems.

## Interview answer

- **Definition:** A queue-based pattern that separates work producers from work consumers.
- **Structure:** Producers, bounded queue, consumers, and backpressure policy.
- **Example:** Upload jobs processed by independent background workers.
- **Trade-off:** It absorbs bursts and scales processing, but introduces queue durability and delivery concerns.

## Implementation

Links to the implementation and test:

- `src/patterns/backend/producer-consumer/producer-consumer-pattern.ts`
- `tests/patterns/backend/producer-consumer/producer-consumer-pattern.test.ts`
