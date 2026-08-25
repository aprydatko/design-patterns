# TypeScript Design Patterns

An educational repository for learning JavaScript design patterns with TypeScript and preparing for technical interviews.

## Repository structure

Each pattern lives in its own folder and contains:

- `README.md` — a short explanation, use case, trade-offs, and interview questions;
- `*.ts` — a minimal implementation without unnecessary infrastructure;
- `*.test.ts` — usage examples and behavior checks.

```text
src/patterns/<category>/<pattern-name>/
├── README.md
└── <pattern-name>.ts
tests/patterns/<category>/<pattern-name>.test.ts
```

The first example is [Module Pattern](src/patterns/creational/module/README.md).

## Getting started

Node.js 20+ is required.

```bash
npm install
npm run check
npm test -- --watch
```

Useful commands:

- `npm run typecheck` — run TypeScript checks without emitting files;
- `npm run lint` — run ESLint static analysis;
- `npm run format` — format files with Prettier;
- `npm test` — run Vitest;
- `npm run check` — run the complete pre-commit quality check.

## Learning cycle for each pattern

1. Describe the problem solved by the pattern.
2. Name the main participants and their responsibilities.
3. Give a real-world use case.
4. Write a minimal TypeScript implementation.
5. Add a behavior-focused test.
6. Record the trade-off: when the pattern helps and when it adds unnecessary complexity.
7. Publish a separate commit such as `feat(pattern): add strategy pattern`.

## Recommended learning order

Module → Factory → Singleton → Observer → Strategy → Adapter → Facade → Decorator → Proxy → Dependency Injection → functional patterns → architectural patterns → React/backend patterns.

The complete pattern template is available in [docs/pattern-template.md](docs/pattern-template.md).

Progress for all checklist topics is tracked in [docs/learning-roadmap.md](docs/learning-roadmap.md).
