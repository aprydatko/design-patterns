# Circuit Breaker Pattern

## Definition

Circuit Breaker protects an application from repeatedly calling a failing dependency. After enough failures it opens the circuit and fails fast, then permits a limited probe after a timeout to test recovery.

## Structure

- **Closed state** — calls the dependency and counts failures.
- **Open state** — rejects calls immediately while the dependency is unhealthy.
- **Half-open state** — allows one probe call after the reset timeout.
- **Fallback or caller** — decides how to respond when the circuit rejects a call.

## Example

An API client can wrap a payment, search, or third-party service so an outage does not consume all application threads waiting on failed requests.

## Trade-offs

### Advantages

- Fails fast during dependency outages.
- Prevents cascading failures and wasted resources.
- Automatically probes for recovery.

### Disadvantages

- Adds state and timing behavior to dependency calls.
- A poorly chosen threshold can hide brief failures or open too aggressively.
- Callers still need a useful fallback when the circuit is open.

## Interview answer

- **Definition:** A resilience mechanism that stops calls to a failing dependency and periodically tests recovery.
- **Structure:** Closed, open, and half-open states with failure and timeout thresholds.
- **Example:** Protecting an application from an unavailable external API.
- **Trade-off:** It limits cascading failure, but requires tuning and fallback behavior.

## Implementation

Links to the implementation and test:

- `src/patterns/backend/circuit-breaker/circuit-breaker-pattern.ts`
- `tests/patterns/backend/circuit-breaker/circuit-breaker-pattern.test.ts`
