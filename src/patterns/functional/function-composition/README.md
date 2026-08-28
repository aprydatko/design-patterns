# Function Composition Pattern

## Definition

Function Composition combines multiple functions into one function. The output of one function becomes the input of the next, allowing a complex transformation to be expressed as a sequence of small operations.

## Structure

- **Inner function:** receives the original input and performs the first transformation;
- **Middle function:** receives the inner result and continues the transformation;
- **Outer function:** receives the middle result and produces the final output;
- **Composed function:** exposes one input and applies the functions right-to-left.

## Example

`compose` can combine trimming, lowercasing, and slug formatting into one product-name formatter. Each transformation remains independently testable and reusable.

## Trade-offs

### Advantages

- Encourages small, focused, reusable functions;
- Makes transformation pipelines concise;
- Keeps each step independently testable.

### Disadvantages

- Right-to-left execution can be unfamiliar;
- Type mismatches between adjacent functions must be resolved;
- Long compositions can be harder to debug than named intermediate steps.

## Interview answer

- **Definition:** combines functions so the output of one feeds the input of another;
- **Structure:** functions are applied right-to-left and exposed as one callable operation;
- **Example:** compose independent string transformations into a formatter;
- **Trade-off:** concise and reusable, but long chains can reduce readability.

## Implementation

- [function-composition.ts](./function-composition.ts)
- `tests/patterns/functional/function-composition/function-composition.test.ts`
