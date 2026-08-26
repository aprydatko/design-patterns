# Singleton Pattern

## Definition

Singleton Pattern restricts a type to one instance and provides a shared access point to it. It is useful when several parts of an application must coordinate through one resource.

## Structure

- **Singleton:** `SettingsStore` owns the shared state and controls its construction.
- **Private constructor:** prevents callers from creating instances with `new`.
- **Access point:** `getInstance` lazily creates and returns the same instance.
- **Contract:** `ApplicationSettings` exposes only the required settings behavior.

## Example

An application can use one settings store for runtime feature flags or configuration values that must be consistent across modules.

## Trade-offs

### Advantages

- Guarantees a single coordinated instance.
- Lazily initializes the resource only when it is first needed.
- Avoids passing the same state through every call site.

### Disadvantages

- Shared mutable state makes dependencies less explicit.
- Tests can influence one another if the singleton is not carefully managed.
- It can make replacing the shared resource with a test double harder.

## Interview answer

- **Definition:** ensures a class has only one instance and provides a global access point;
- **Structure:** private constructor, static instance, and an accessor such as `getInstance`;
- **Example:** application configuration, logging, or a connection pool;
- **Trade-off:** convenient coordination, but hidden global state reduces testability.

## Implementation

Links to the implementation and test:

- [singleton-pattern.ts](./singleton-pattern.ts)
- `tests/patterns/creational/singleton/singleton-pattern.test.ts`
