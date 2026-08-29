# Pattern: CQRS (Command Query Responsibility Segregation)

## Definition

CQRS separates operations that change state (commands) from operations that read state (queries). Each side has a focused contract and can use a model or storage optimized for its responsibility.

## Structure

- `UserCommandHandler` validates and executes state-changing commands through `UserWritePort`.
- `UserQueryHandler` reads through `UserReadPort` and returns DTO projections.
- `createCqrsUserApplication` wires both sides for the example.
- The sample uses one repository for both ports, but production adapters can use separate write storage and read projections.

## Example

User registration and removal go through the command handler, while profile screens use the query handler. A read model can be denormalized or replicated for fast queries without changing command behavior.

## Trade-offs

### Advantages

- Lets read and write models evolve and scale independently.
- Makes mutation and query responsibilities explicit.
- Supports specialized read projections and audit-friendly commands.

### Disadvantages

- Adds separate handlers, models, and synchronization concerns.
- Read projections may be eventually consistent in distributed systems.
- Is often unnecessary for simple CRUD applications.

## Interview answer

- **Definition:** CQRS separates commands that mutate state from queries that read state.
- **Structure:** Command handlers use a write model; query handlers use a read model or projection.
- **Example:** Registration writes to a user store while profile queries read a denormalized projection.
- **Trade-off:** It improves independent optimization and clarity, but adds complexity and possible consistency lag.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/cqrs/cqrs-pattern.ts`
- `tests/patterns/architectural/cqrs/cqrs-pattern.test.ts`
