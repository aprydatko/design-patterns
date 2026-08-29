# Pattern: Service Layer

## Definition

The Service Layer defines application operations and coordinates the work needed to complete them. It keeps business rules and use-case orchestration out of controllers, views, and persistence implementations.

## Structure

- `UserService` exposes user-related application operations.
- `createUserService` coordinates validation, normalization, duplicate detection, ID generation, and persistence.
- `UserRepository` supplies persistence operations through the repository contract.
- The ID generator is injectable, which keeps tests deterministic.

## Example

An HTTP controller can pass a registration request to `UserService.register` and translate its result or errors into an HTTP response. The controller does not need to know how users are stored or how duplicate emails are checked.

## Trade-offs

### Advantages

- Centralizes business rules for a use case.
- Keeps controllers thin and persistence concerns separate.
- Provides a focused seam for testing application behavior.

### Disadvantages

- Can become a dumping ground if unrelated use cases are placed in one service.
- Adds an extra layer for trivial CRUD operations.
- Service methods may need to coordinate multiple repositories or external collaborators.

## Interview answer

- **Definition:** A Service Layer encapsulates application operations and their business orchestration.
- **Structure:** Callers use a service contract; the service validates input, applies rules, and delegates persistence to repositories.
- **Example:** A registration service normalizes an email, checks uniqueness, creates a user, and saves it.
- **Trade-off:** It improves separation and testability, but adds indirection and needs clear use-case boundaries.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/service-layer/service-layer-pattern.ts`
- `tests/patterns/architectural/service-layer/service-layer-pattern.test.ts`
