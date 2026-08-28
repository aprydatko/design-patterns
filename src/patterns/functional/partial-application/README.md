# Partial Application Pattern

## Definition

Partial Application fixes one or more arguments of a function and returns a new function that accepts the remaining arguments. Unlike Currying, the returned function can receive all remaining arguments together instead of requiring one call per argument.

## Structure

- **Original operation:** accepts a fixed first argument and remaining arguments;
- **Partial application function:** captures the selected argument;
- **Returned function:** accepts the remaining arguments and delegates to the original operation.

## Example

`partialApplyFirst` can configure a delivery service fee once and create a reusable function for calculating costs from package weight and insurance choice. This is useful when an application repeatedly invokes the same operation with stable configuration.

## Trade-offs

### Advantages

- Reduces repeated arguments at call sites;
- Creates focused, reusable functions from general operations;
- Keeps the remaining call shape straightforward.

### Disadvantages

- The fixed argument position must be chosen in advance;
- Too many specialized functions can make code harder to discover;
- It is less flexible than a general-purpose argument binding utility.

## Interview answer

- **Definition:** pre-fills some arguments and returns a function for the rest;
- **Structure:** captured arguments are combined with later arguments on invocation;
- **Example:** configure a delivery fee and reuse the resulting cost calculator;
- **Trade-off:** reduces repetition, but can create many narrowly specialized functions.

## Implementation

- [partial-application.ts](./partial-application.ts)
- `tests/patterns/functional/partial-application/partial-application.test.ts`
