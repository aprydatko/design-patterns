import { describe, expect, it } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';

describe('Service Layer Pattern', () => {
  it('orchestrates registration rules and delegates persistence', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');

    const user = service.register({ name: ' Ada Lovelace ', email: ' ADA@EXAMPLE.COM ' });

    expect(user).toEqual({
      id: 'user-1',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
    expect(service.findById('user-1')).toEqual(user);
  });

  it('rejects invalid input and duplicate email addresses', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');

    expect(() => service.register({ name: ' ', email: 'ada@example.com' })).toThrow(
      'Name and email are required',
    );

    service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });

    expect(() => service.register({ name: 'Another Ada', email: ' ADA@EXAMPLE.COM ' })).toThrow(
      'Email is already registered',
    );
  });

  it('keeps retrieval and removal operations behind the service boundary', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });

    expect(service.list()).toHaveLength(1);
    expect(service.remove('user-1')).toBe(true);
    expect(service.findById('user-1')).toBeUndefined();
  });
});
