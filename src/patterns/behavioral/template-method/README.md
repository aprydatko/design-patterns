# Template Method Pattern

## Definition

Template Method Pattern defines the skeleton of an algorithm in a base class while allowing subclasses to override selected steps. The overall order remains consistent, but each implementation can provide its own details.

## Structure

- **Abstract class:** `DataImporter` defines the `run` workflow.
- **Template method:** `run` parses, validates, and returns imported data in a fixed order.
- **Primitive operation:** `parse` is customized by each importer.
- **Concrete classes:** `CsvImporter` and `JsonImporter` implement format-specific parsing.

## Example

An import service can guarantee validation and result handling for every file format while allowing each format to parse its input differently.

## Trade-offs

### Advantages

- Reuses the common algorithm structure.
- Prevents subclasses from accidentally changing required workflow steps.
- Keeps format-specific behavior localized.

### Disadvantages

- Relies on inheritance, which can make subclasses tightly coupled to the base class.
- Hooks and protected methods can make the lifecycle harder to understand.
- A changing workflow may require changes to the base class.

## Interview answer

- **Definition:** defines an algorithm’s skeleton and lets subclasses customize steps;
- **Structure:** an abstract base class owns the template method and concrete subclasses implement primitive operations;
- **Example:** data imports, build pipelines, report generation, or request processing;
- **Trade-off:** centralizes workflow reuse, but increases inheritance coupling.

## Implementation

Links to the implementation and test:

- [template-method-pattern.ts](./template-method-pattern.ts)
- `tests/patterns/behavioral/template-method/template-method-pattern.test.ts`
