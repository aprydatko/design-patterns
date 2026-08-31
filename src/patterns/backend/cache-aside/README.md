# Cache-Aside Pattern

## Definition

Cache-Aside keeps the cache outside the source of truth. The application checks the cache first, loads missing data from the source, and explicitly writes the result into the cache.

## Structure

- **Cache store** — provides read, write, and delete operations.
- **Data source** — loads the authoritative value on a cache miss.
- **Cache-aside coordinator** — applies the read-through-on-miss flow.
- **Invalidation** — removes stale values after a source update.

## Example

A product service can read product details from Redis first and query the database only on a miss, then cache the returned product for later requests.

## Trade-offs

### Advantages

- Keeps cache failures and policy outside the data source.
- Avoids caching data that is never requested.
- Works with almost any cache and persistent store.

### Disadvantages

- The first request is slower because it loads from the source.
- Updates require careful invalidation to avoid stale data.
- Concurrent misses can trigger duplicate source loads without request coalescing.

## Interview answer

- **Definition:** The application reads the cache first and populates it after a source miss.
- **Structure:** Cache store, authoritative data source, coordinator, and invalidation policy.
- **Example:** Caching database-backed product details in Redis.
- **Trade-off:** It is simple and broadly applicable, but stale data and cache-miss duplication need management.

## Implementation

Links to the implementation and test:

- `src/patterns/backend/cache-aside/cache-aside-pattern.ts`
- `tests/patterns/backend/cache-aside/cache-aside-pattern.test.ts`
