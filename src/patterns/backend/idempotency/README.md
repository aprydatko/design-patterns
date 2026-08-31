# Idempotency Pattern

## Definition

Idempotency ensures that retrying an operation with the same key produces the same effect as executing it once. A completed result is stored and reused, while concurrent requests with the same key share one in-flight operation.

## Structure

- **Idempotency key** — identifies one logical operation, such as a payment attempt.
- **Operation** — the work that should happen at most once for that key.
- **Result store** — persists completed results for later retries.
- **Coordinator** — checks stored and in-flight results before invoking the operation.

## Example

An order API can accept an `Idempotency-Key` header so a client retry after a network timeout does not create a second order or charge a customer twice.

## Trade-offs

### Advantages

- Makes retries safe for clients and distributed systems.
- Prevents duplicate work from concurrent requests.
- Separates retry coordination from business operations.

### Disadvantages

- Stored results require a retention and cleanup policy.
- The key must be scoped correctly to the client and operation.
- A distributed deployment needs a shared atomic store for cross-process guarantees.

## Interview answer

- **Definition:** A pattern that makes repeated requests with the same key have one effective result.
- **Structure:** Key, operation, result store, and coordinator.
- **Example:** Preventing duplicate payment or order creation after a retry.
- **Trade-off:** It provides safe retries, but needs durable storage, expiration, and correct key scoping.

## Implementation

Links to the implementation and test:

- `src/patterns/backend/idempotency/idempotency-pattern.ts`
- `tests/patterns/backend/idempotency/idempotency-pattern.test.ts`
