# Pattern: Provider

## Definition

The Provider Pattern makes shared state or services available to a subtree of consumers through a context contract. Consumers avoid receiving the same dependency through every intermediate component.

## Example

`createUserProvider` supplies the current user and `selectUser` action to any consumer callback. The consumer only depends on `UserProviderContext`, not on the user service or mapper.

## Trade-offs

Providers simplify dependency sharing and reduce prop drilling, but implicit dependencies can make components harder to reuse or test outside the provider. Keep the context focused and provide explicit test contexts when needed.

## Implementation

- `src/patterns/architectural/provider/provider-pattern.ts`
- `tests/patterns/architectural/provider/provider-pattern.test.ts`
