import { describe, expect, it } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import { useUserList } from '@patterns/architectural/custom-hooks/custom-hooks-pattern.js';

describe('Custom Hooks Pattern', () => {
  it('encapsulates reusable loading state and exposes view-ready data', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ADA@example.com' });
    const userList = useUserList(service);

    userList.load();

    expect(userList.getState()).toEqual({
      users: [{ userId: 'user-1', displayName: 'Ada Lovelace', emailAddress: 'ada@example.com' }],
      selectedUserId: undefined,
      isLoading: false,
      error: undefined,
    });
  });

  it('shares selection behavior without owning presentation', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });
    const userList = useUserList(service);

    userList.selectUser('user-1');
    expect(userList.getState()).toMatchObject({ selectedUserId: 'user-1', error: undefined });

    userList.selectUser('missing-user');
    expect(userList.getState()).toMatchObject({
      selectedUserId: undefined,
      error: 'User not found',
    });
  });
});
