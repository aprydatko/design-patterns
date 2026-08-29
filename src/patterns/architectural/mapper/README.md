# Pattern: Mapper

## Definition

The Mapper Pattern converts data between two representations while keeping their structures and responsibilities separate. A mapper makes the translation explicit, so domain entities do not need to know about API, database, or UI formats.

## Structure

- `User` is the internal domain representation.
- `UserProfileDto` is the transport representation defined by the DTO boundary.
- `UserMapper` declares the conversion contract in both directions.
- `createUserMapper` owns the field-by-field translation.

## Example

An API controller can map incoming profile DTOs to domain users before invoking application logic, then map the result back to a response DTO. Renaming `User.name` or `User.id` does not require transport code to perform the conversion itself.

## Trade-offs

### Advantages

- Isolates representation conversion in one focused place.
- Prevents domain and transport models from becoming coupled.
- Makes field renames, omitted fields, and format changes explicit.

### Disadvantages

- Requires additional code and types for each boundary.
- Mappers must be updated as either representation evolves.
- A trivial application may not benefit from the extra indirection.

## Interview answer

- **Definition:** A mapper translates data between two models with different responsibilities or shapes.
- **Structure:** A mapper exposes conversion functions while domain and transport types remain independent.
- **Example:** Convert an API `UserProfileDto` into a domain `User` before passing it to a service.
- **Trade-off:** It reduces coupling and clarifies boundaries, but introduces conversion code to maintain.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/mapper/mapper-pattern.ts`
- `tests/patterns/architectural/mapper/mapper-pattern.test.ts`
