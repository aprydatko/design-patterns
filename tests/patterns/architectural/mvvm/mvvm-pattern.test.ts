import { describe, expect, it, vi } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import { createUserViewModel } from '@patterns/architectural/mvvm/mvvm-pattern.js';

const createModelWithAda = () => {
  const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
  service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });
  return service;
};

describe('MVVM Pattern', () => {
  it('exposes view-ready state through commands', () => {
    const viewModel = createUserViewModel(createModelWithAda());

    viewModel.load();
    viewModel.selectUser('user-1');

    expect(viewModel.getState()).toEqual({
      users: [{ userId: 'user-1', displayName: 'Ada Lovelace', emailAddress: 'ada@example.com' }],
      selectedUser: {
        userId: 'user-1',
        displayName: 'Ada Lovelace',
        emailAddress: 'ada@example.com',
      },
      isLoading: false,
      error: undefined,
    });
  });

  it('publishes state changes and supports unsubscribing', () => {
    const viewModel = createUserViewModel(createModelWithAda());
    const listener = vi.fn();
    const unsubscribe = viewModel.subscribe(listener);

    viewModel.load();
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    viewModel.selectUser('user-1');
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('keeps selection errors in the ViewModel state', () => {
    const viewModel = createUserViewModel(createModelWithAda());

    viewModel.selectUser('missing-user');

    expect(viewModel.getState()).toMatchObject({
      selectedUser: undefined,
      error: 'User not found',
    });
  });
});
