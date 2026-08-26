# Dependency Injection

## Definition

Dependency Injection supplies a component’s collaborators from outside instead of letting the component create them internally. This keeps dependencies explicit and allows production implementations to be replaced with test doubles or alternative implementations.

## Structure

- **Consumer:** `createWelcomeService` contains the welcome-message behavior.
- **Dependencies:** `UserDirectory` and `Clock` are contracts the consumer needs.
- **Composition root:** the caller chooses concrete implementations and passes them to the service.
- **Test doubles:** tests can provide deterministic directory and clock implementations.

## Example

An application can inject a database-backed user directory and system clock in production, then inject in-memory data and a fixed clock in tests.

## Trade-offs

### Advantages

- Makes dependencies visible at the composition boundary.
- Improves testability without changing business logic.
- Supports replacing infrastructure implementations.

### Disadvantages

- Requires composition code to assemble the object graph.
- Too many tiny interfaces can add unnecessary ceremony.
- Misconfigured dependencies fail at runtime unless the composition is validated.

## Interview answer

- **Definition:** provides dependencies to a component from the outside;
- **Structure:** a consumer depends on contracts while a composition root selects implementations;
- **Example:** injecting repositories, clocks, HTTP clients, or message publishers;
- **Trade-off:** improves decoupling and testability, but moves setup complexity to callers.

## Implementation

Links to the implementation and test:

- [dependency-injection-pattern.ts](./dependency-injection-pattern.ts)
- `tests/patterns/architectural/dependency-injection/dependency-injection-pattern.test.ts`
