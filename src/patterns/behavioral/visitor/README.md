# Visitor Pattern

## Definition

Visitor separates operations from the object structure they operate on, allowing new operations without changing the element classes.

## Structure

- **Element:** `DocumentElement` defines the `accept` operation.
- **Concrete elements:** `Paragraph` and `Heading` dispatch to the appropriate visitor method.
- **Visitor:** `DocumentVisitor` defines operations for each element type.
- **Concrete visitors:** `HtmlRenderVisitor` and `WordCountVisitor` implement different document operations.

## Example

A document editor can add HTML rendering, word counting, or other processing operations without modifying paragraph and heading classes.

## Trade-offs

### Advantages

- Makes adding operations easy.
- Keeps related operations together in dedicated visitors.
- Supports type-specific behavior through double dispatch.

### Disadvantages

- Adding a new element type requires updating every visitor.
- Visitors can become tightly coupled to the element structure.

## Interview answer

- **Definition:** moves operations into visitor objects while preserving access to element types;
- **Structure:** element interface, concrete elements, visitor interface, and concrete visitors;
- **Example:** rendering and counting words in document elements;
- **Trade-off:** adding operations is cheap, but adding element types is expensive.

## Implementation

- [visitor-pattern.ts](./visitor-pattern.ts)
- `tests/patterns/behavioral/visitor/visitor-pattern.test.ts`
