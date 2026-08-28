# Lazy Initialization Pattern

## Definition

Lazy Initialization postpones creating a value until it is actually needed. After the first successful creation, the value is usually retained and returned for later requests.

## Structure

- **Factory:** creates the value when requested;
- **Initialization state:** records whether creation has completed;
- **Lazy accessor:** creates once on first access and returns the cached value afterward.

## Example

`createLazy` can defer creating an expensive configuration object, parser, or client until a code path actually needs it. Its `reset` operation makes reinitialization explicit for tests or lifecycle changes.

## Trade-offs

### Advantages

- Avoids work for values that are never used;
- Keeps creation logic close to the value's access boundary;
- Ensures repeated access reuses the same instance.

### Disadvantages

- First access pays the creation cost;
- Delayed failures can make startup problems appear later;
- Retaining the value can keep resources alive longer than expected.

## Interview answer

- **Definition:** delays object creation until first use;
- **Structure:** a factory, an initialization flag, and an accessor holding the created value;
- **Example:** defer constructing an expensive client until a request needs it;
- **Trade-off:** saves unnecessary startup work, but shifts cost and possible errors to first access.

## Implementation

- [lazy-initialization.ts](./lazy-initialization.ts)
- `tests/patterns/functional/lazy-initialization/lazy-initialization.test.ts`
