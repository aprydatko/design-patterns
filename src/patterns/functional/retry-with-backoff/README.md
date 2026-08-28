# Retry with Backoff Pattern

## Definition

Retry with Backoff repeats a failed operation after waiting between attempts. The delay grows after each failure, reducing pressure on a temporarily unavailable dependency and increasing the chance that it recovers.

## Structure

- **Operation:** performs an asynchronous task;
- **Attempt counter:** limits how many times the task may run;
- **Backoff calculator:** increases the delay after each failure;
- **Retry predicate:** optionally decides whether a particular error is transient.

## Example

`retryWithBackoff` can protect a request to a temporarily unavailable service. With an initial delay of 100 ms and a factor of 2, retries wait 100 ms, then 200 ms, then 400 ms between failed attempts.

## Trade-offs

### Advantages

- Handles transient failures without immediate repeated requests;
- Limits total attempts;
- Allows callers to reject non-retryable errors early.

### Disadvantages

- Delays failure reporting;
- Repeating a non-idempotent operation can cause duplicate side effects;
- The retry policy must be bounded and should use jitter in distributed systems to avoid synchronized retries.

## Interview answer

- **Definition:** retries failed work with progressively longer delays;
- **Structure:** an attempt limit, backoff calculation, and optional retry predicate surround the operation;
- **Example:** retry a transient network request before surfacing the error;
- **Trade-off:** improves resilience, but adds latency and can duplicate side effects.

## Implementation

- [retry-with-backoff.ts](./retry-with-backoff.ts)
- `tests/patterns/functional/retry-with-backoff/retry-with-backoff.test.ts`
