# Middleware Pattern

## Definition

Middleware passes a request or context through a chain of independent steps. Each step can enrich the context, perform cross-cutting work, stop the chain, or call `next()` to continue.

## Structure

- **Context** — mutable request or operation data shared by the chain.
- **Middleware** — a focused step that receives the context and a `next` function.
- **Pipeline** — composes middleware in order and invokes the terminal operation.
- **Terminal operation** — runs after every middleware has continued the chain.

## Example

HTTP servers use middleware for authentication, logging, validation, rate limiting, and error handling before a route handler runs.

## Trade-offs

### Advantages

- Separates cross-cutting concerns into reusable steps.
- Makes ordering and short-circuiting explicit.
- Allows middleware to run both before and after downstream work.

### Disadvantages

- Incorrect ordering can change application behavior.
- A middleware that forgets to call `next()` silently stops the chain.
- Deep chains can make control flow harder to trace.

## Interview answer

- **Definition:** A chain of handlers where each handler can process a context and delegate to the next handler.
- **Structure:** Middleware, `next`, shared context, and a terminal operation.
- **Example:** Authentication and logging around an HTTP route.
- **Trade-off:** Excellent for cross-cutting concerns, but chain order and delegation must be carefully managed.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/middleware/middleware-pattern.ts`
- `tests/patterns/architectural/middleware/middleware-pattern.test.ts`
