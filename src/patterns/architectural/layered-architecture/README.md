# Pattern: Layered Architecture

## Definition

Layered Architecture organizes an application into layers with clear responsibilities and dependency direction. Each layer communicates through contracts, allowing presentation concerns, application rules, and infrastructure details to change independently.

## Structure

- The infrastructure layer provides `UserRepository` implementations.
- The application layer uses `UserService` to coordinate user use cases and business rules.
- The presentation layer converts application results into transport responses.
- `createLayeredUserApplication` is the composition root that wires the layers together.

## Example

An HTTP adapter can call `UserPresentationLayer.registerUser` and `listUsers`. It does not know whether the repository uses memory, a database, or an external API, and the application layer does not know how responses are serialized.

## Trade-offs

### Advantages

- Gives responsibilities and dependency direction a predictable structure.
- Makes infrastructure replaceable and layers independently testable.
- Prevents presentation code from containing persistence or business rules.

### Disadvantages

- Adds boundaries and boilerplate even for small applications.
- Poorly designed layers can become pass-through wrappers.
- Rules for dependency direction and ownership require discipline.

## Interview answer

- **Definition:** Layered Architecture separates an application into responsibility-focused layers.
- **Structure:** Presentation calls the application layer, which depends on domain contracts and infrastructure abstractions.
- **Example:** A presentation adapter registers users through a service backed by an injectable repository.
- **Trade-off:** It improves maintainability and replaceability, but adds structure and indirection.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/layered-architecture/layered-architecture-pattern.ts`
- `tests/patterns/architectural/layered-architecture/layered-architecture-pattern.test.ts`
