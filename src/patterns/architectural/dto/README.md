# Pattern: DTO (Data Transfer Object)

## Definition

A Data Transfer Object is a small data structure designed for communication across an application boundary. It carries only the fields a client needs and does not expose domain behavior, persistence details, or internal object structure.

## Structure

- `User` is the internal domain entity.
- `UserProfileDto` is the public profile response shape.
- `createUserProfileDto` creates a transport object with explicit field names.
- `createUserProfileApi` adapts read operations into DTO responses.

## Example

An HTTP endpoint can return `UserProfileDto` instead of returning a domain entity directly. The API can rename fields and omit internal fields without changing the domain model.

## Trade-offs

### Advantages

- Prevents internal domain or persistence details from leaking across boundaries.
- Makes API contracts explicit and stable.
- Allows transport-specific field names and shapes.

### Disadvantages

- Adds conversion code and another type to maintain.
- DTOs can become too closely coupled to internal entities.
- A large application may need separate DTOs for different clients and use cases.

## Interview answer

- **Definition:** A DTO is a data-only object used to transfer information across a boundary.
- **Structure:** The boundary exposes a DTO contract, while domain entities remain internal.
- **Example:** Return a profile DTO from an API instead of serializing a domain user directly.
- **Trade-off:** DTOs protect contracts and reduce coupling, but require explicit conversion and maintenance.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/dto/dto-pattern.ts`
- `tests/patterns/architectural/dto/dto-pattern.test.ts`
