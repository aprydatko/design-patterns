# Pattern: Hexagonal Architecture (Ports and Adapters)

## Definition

Hexagonal Architecture keeps application and domain logic at the center and connects it to the outside world through ports. Adapters implement those ports for specific technologies, so the core does not depend on databases, web frameworks, or delivery mechanisms.

## Structure

- `RegisterUserInputPort` is the inbound port for the registration use case.
- `UserPersistencePort` and `UserIdPort` are outbound ports required by the core.
- `createRegisterUserUseCase` is the framework-independent application core.
- `createRepositoryPersistenceAdapter` is an outbound adapter for `UserRepository`.
- `createUserRegistrationHttpAdapter` is an inbound adapter for HTTP-like requests.

## Example

An HTTP adapter can invoke the registration use case while a repository adapter persists the result. Either adapter can be replaced with a CLI adapter, message consumer, database adapter, or test double without changing the core use case.

## Trade-offs

### Advantages

- Keeps core logic independent of frameworks and infrastructure.
- Makes technology boundaries explicit and replaceable.
- Enables fast unit tests using simple port fakes.

### Disadvantages

- Requires more interfaces and wiring than a direct implementation.
- Adapters need maintenance when port contracts change.
- The architecture can be excessive for a small, stable application.

## Interview answer

- **Definition:** Hexagonal Architecture isolates the application core behind ports implemented by adapters.
- **Structure:** Inbound adapters call input ports; the core calls output ports; infrastructure implements those output ports.
- **Example:** An HTTP registration adapter invokes a use case backed by a repository adapter.
- **Trade-off:** It improves independence and testability, but adds interfaces and composition overhead.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/hexagonal/hexagonal-pattern.ts`
- `tests/patterns/architectural/hexagonal/hexagonal-pattern.test.ts`
