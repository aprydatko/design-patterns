import { describe, expect, it } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import { createUserProvider } from '@patterns/architectural/provider/provider-pattern.js';

describe('Provider Pattern', () => {
  it('shares context with consumers without prop drilling', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ADA@example.com' });
    const provider = createUserProvider(service);

    provider.selectUser('user-1');

    const result = provider.provide(({ currentUser }) => ({
      name: currentUser?.displayName,
      email: currentUser?.emailAddress,
    }));

    expect(result).toEqual({ name: 'Ada Lovelace', email: 'ada@example.com' });
  });

  it('exposes shared actions through the context contract', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });
    const provider = createUserProvider(service);

    provider.provide(({ selectUser }) => {
      selectUser('user-1');
    });

    expect(provider.getContext().currentUser?.userId).toBe('user-1');
  });
});
