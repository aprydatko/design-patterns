import { describe, expect, it } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import {
  createUserProfileApi,
  createUserProfileDto,
} from '@patterns/architectural/dto/dto-pattern.js';

describe('DTO Pattern', () => {
  it('exposes an explicit transport shape instead of the domain entity shape', () => {
    const user = { id: 'user-1', name: 'Ada Lovelace', email: 'ada@example.com' };

    expect(createUserProfileDto(user)).toEqual({
      userId: 'user-1',
      displayName: 'Ada Lovelace',
      emailAddress: 'ada@example.com',
    });
  });

  it('creates DTO responses from a service without exposing service entities', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });
    const api = createUserProfileApi(service);

    expect(api.getProfile('user-1')).toEqual({
      userId: 'user-1',
      displayName: 'Ada Lovelace',
      emailAddress: 'ada@example.com',
    });
    expect(api.listProfiles()).toHaveLength(1);
    expect(api.getProfile('missing-user')).toBeUndefined();
  });

  it('creates a fresh DTO so transport data cannot replace the source entity', () => {
    const user = { id: 'user-1', name: 'Ada Lovelace', email: 'ada@example.com' };
    const dto = createUserProfileDto(user);

    expect(dto).not.toBe(user);
    expect(Object.keys(dto)).toEqual(['userId', 'displayName', 'emailAddress']);
  });
});
