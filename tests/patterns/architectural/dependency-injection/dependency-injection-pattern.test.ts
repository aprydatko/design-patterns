import { describe, expect, it } from 'vitest';

import { createWelcomeService } from '@patterns/architectural/dependency-injection/dependency-injection-pattern.js';

describe('Dependency Injection', () => {
  it('uses injected dependencies to create deterministic behavior', () => {
    const service = createWelcomeService(
      { findName: (userId) => (userId === 'user-1' ? 'Ada Lovelace' : undefined) },
      { now: () => new Date('1843-12-10T00:00:00.000Z') },
    );

    expect(service.createMessage('user-1')).toBe('Welcome, Ada Lovelace! Today is 1843-12-10.');
  });

  it('allows injected collaborators to be replaced independently', () => {
    const service = createWelcomeService({ findName: () => undefined }, { now: () => new Date() });

    expect(service.createMessage('missing-user')).toBe('User not found');
  });
});
