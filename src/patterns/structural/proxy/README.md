# Proxy Pattern

## Definition

Proxy Pattern provides a stand-in object with the same interface as another object. The proxy controls access to the real subject and can add behavior such as caching, authorization, lazy loading, or logging.

## Structure

- **Subject:** `ProfileService` defines the interface used by clients.
- **Real subject:** `UserProfileService` retrieves profiles from its data source.
- **Proxy:** `CachingProfileProxy` implements the same interface and caches lookups before delegating to the real service.
- **Client:** callers use the proxy without knowing whether a request is served from cache or the underlying service.

## Example

A frontend or backend can place a caching proxy in front of a remote profile API to avoid repeated requests for the same user.

## Trade-offs

### Advantages

- Adds cross-cutting behavior without changing the real service.
- Preserves the client-facing contract.
- Can improve performance or enforce access rules at one boundary.

### Disadvantages

- Adds another layer that can hide the cost or behavior of a call.
- Cache invalidation can make returned data stale.
- Proxy behavior must remain compatible with the real subject.

## Interview answer

- **Definition:** controls access to an object through a compatible stand-in;
- **Structure:** a shared subject interface, a real subject, and a proxy that delegates or intercepts calls;
- **Example:** caching, authorization, lazy loading, logging, or remote-service access;
- **Trade-off:** centralizes access concerns, but adds indirection and possible consistency issues.

## Implementation

Links to the implementation and test:

- [proxy-pattern.ts](./proxy-pattern.ts)
- `tests/patterns/structural/proxy/proxy-pattern.test.ts`
