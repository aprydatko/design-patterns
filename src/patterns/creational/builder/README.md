# Builder Pattern

## Definition

Builder separates the step-by-step construction of a complex object from its final representation.

## Structure

- **Product:** `UserProfile` is the immutable object being built.
- **Builder:** `UserProfileBuilder` exposes fluent methods for required and optional fields.
- **Build step:** `build` validates required fields and creates the final product.

## Example

A registration flow can configure a user profile gradually, adding optional details only when they are available.

## Trade-offs

### Advantages

- Makes object construction readable.
- Keeps validation and construction rules in one place.
- Avoids constructors with many positional parameters.

### Disadvantages

- Adds a separate builder type and more code.
- The mutable builder must not be confused with the immutable product.

## Interview answer

- **Definition:** separates complex object construction from the object itself;
- **Structure:** product, builder methods, and a final build operation;
- **Example:** assembling a user profile with required and optional fields;
- **Trade-off:** improves clarity and validation, but introduces an additional abstraction.

## Implementation

- [builder-pattern.ts](./builder-pattern.ts)
- `tests/patterns/creational/builder/builder-pattern.test.ts`
