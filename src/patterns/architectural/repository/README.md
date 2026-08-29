# Pattern: Repository

## Definition

The Repository Pattern provides a collection-like interface for accessing domain entities while hiding how those entities are stored. Application code depends on the repository contract, so persistence can change from an in-memory collection to a database without changing the calling code.

## Structure

- `User` is the domain entity.
- `UserRepository` is the persistence boundary used by application code.
- `createInMemoryUserRepository` is one implementation of that boundary.
- The `Map` is an infrastructure detail that remains private to the implementation.

## Example

A user service can depend on `UserRepository` to load and save users. Production code can inject a database-backed implementation, while tests can use the in-memory implementation without a database.

## Trade-offs

### Advantages

- Keeps persistence details out of application and domain logic.
- Makes storage implementations replaceable and easy to test.
- Gives callers a focused, domain-specific API.

### Disadvantages

- Adds an abstraction that may be unnecessary for very small applications.
- A repository can become a generic data-access wrapper if its interface is not expressed in domain terms.
- Different persistence systems may not support exactly the same behavior.

## Interview answer

- **Definition:** A repository abstracts persistence behind a collection-like interface for domain entities.
- **Structure:** Callers depend on a repository contract; concrete implementations handle database, API, or in-memory storage.
- **Example:** Inject a database-backed `UserRepository` into a user service and use an in-memory one in tests.
- **Trade-off:** It improves testability and separation of concerns, but adds indirection and must remain domain-focused.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/repository/repository-pattern.ts`
- `tests/patterns/architectural/repository/repository-pattern.test.ts`
