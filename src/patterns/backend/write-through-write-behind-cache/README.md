# Write-Through / Write-Behind Cache

## Definition

Write-Through updates the source of truth and cache as one write operation, so the cache is populated only after persistence succeeds. Write-Behind updates the cache first and queues persistence for later, reducing write latency at the cost of eventual consistency.

## Structure

- **Cache** — fast storage used for reads.
- **Source** — durable system of record.
- **Write-through coordinator** — persists first, then updates the cache.
- **Write-behind coordinator** — updates the cache immediately and flushes queued writes later.

## Example

A profile service can use Write-Through when every update must be durable before returning. A high-volume metrics or activity service can use Write-Behind to absorb bursts and persist them asynchronously.

## Trade-offs

### Advantages

- Write-Through keeps cache and source updates ordered and predictable.
- Write-Behind reduces request latency and handles bursts efficiently.
- Both strategies centralize cache-write policy.

### Disadvantages

- Write-Through is slower and depends on source availability.
- Write-Behind can lose queued data if the process fails before flushing.
- Write-Behind requires queue monitoring, retries, and idempotent source writes.

## Interview answer

- **Definition:** Write-Through persists before caching; Write-Behind caches first and persists asynchronously.
- **Structure:** Cache, source of truth, write coordinator, and (for Write-Behind) a pending-write queue.
- **Example:** Durable profile updates versus bursty analytics events.
- **Trade-off:** Write-Through favors consistency; Write-Behind favors latency and throughput.

## Implementation

Links to the implementation and test:

- `src/patterns/backend/write-through-write-behind-cache/write-through-write-behind-cache-pattern.ts`
- `tests/patterns/backend/write-through-write-behind-cache/write-through-write-behind-cache-pattern.test.ts`
