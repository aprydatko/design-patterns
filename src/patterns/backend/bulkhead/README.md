# Bulkhead Pattern

## Definition

Bulkhead limits the resources available to a class of operations so overload or failure in one area does not bring down the whole application. Calls that exceed the compartment's capacity are rejected or handled by a fallback.

## Structure

- **Compartment** — owns an isolated concurrency limit.
- **Operation** — work that runs inside the compartment.
- **Capacity policy** — accepts work while slots are available and rejects excess work.
- **Fallback** — caller behavior for rejected work.

## Example

An API client can give payment calls and analytics calls separate concurrency limits. A slow analytics provider then cannot consume every available connection or worker.

## Trade-offs

### Advantages

- Prevents one dependency from exhausting shared capacity.
- Makes resource limits explicit and observable.
- Fails quickly when a compartment is saturated.

### Disadvantages

- Rejected work requires retry or fallback behavior.
- Capacity tuning affects throughput and latency.
- Multiple compartments add operational complexity.

## Interview answer

- **Definition:** A resilience pattern that isolates resources into limited compartments.
- **Structure:** A compartment, capacity limit, operation, and fallback for saturation.
- **Example:** Separate concurrency pools for payments and reporting APIs.
- **Trade-off:** It contains overload, but excess requests need a deliberate rejection policy.

## Implementation

Links to the implementation and test:

- `src/patterns/backend/bulkhead/bulkhead-pattern.ts`
- `tests/patterns/backend/bulkhead/bulkhead-pattern.test.ts`
