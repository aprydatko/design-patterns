# Pattern: Skeleton / Progressive Loading

## Definition

Skeleton Loading shows placeholder content that preserves the final layout while data loads. Progressive Loading improves it by replacing placeholders with real content as chunks become available.

## Example

`createProgressiveList` starts with a configured number of skeleton slots, appends each loaded chunk immediately, and removes remaining placeholders after the loader completes.

## Trade-offs

This improves perceived performance and prevents layout shifts, but requires realistic skeletons and chunk-aware loading. Poorly sized placeholders or very short loads can add unnecessary visual noise.

## Implementation

- `src/patterns/architectural/skeleton-progressive-loading/skeleton-progressive-loading-pattern.ts`
- `tests/patterns/architectural/skeleton-progressive-loading/skeleton-progressive-loading-pattern.test.ts`
