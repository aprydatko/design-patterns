import { describe, expect, it, vi } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import {
  createUserDispatcher,
  createUserStore,
} from '@patterns/architectural/flux/flux-pattern.js';

const createStoreWithAda = () => {
  const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
  service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });
  const dispatcher = createUserDispatcher();
  return { dispatcher, store: createUserStore(service, dispatcher) };
};

describe('Flux / Unidirectional Data Flow Pattern', () => {
  it('flows actions through the dispatcher into Store state', () => {
    const { store } = createStoreWithAda();

    store.dispatch({ type: 'loadUsers' });
    store.dispatch({ type: 'selectUser', userId: 'user-1' });

    expect(store.getState()).toEqual({
      users: [{ userId: 'user-1', displayName: 'Ada Lovelace', emailAddress: 'ada@example.com' }],
      selectedUserId: 'user-1',
      isLoading: false,
      error: undefined,
    });
  });

  it('notifies subscribed Views after each state transition', () => {
    const { store } = createStoreWithAda();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.dispatch({ type: 'loadUsers' });
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    store.dispatch({ type: 'clearSelection' });
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('supports dispatcher subscribers independently from the Store', () => {
    const { dispatcher } = createStoreWithAda();
    const handler = vi.fn();
    const unsubscribe = dispatcher.subscribe(handler);

    dispatcher.dispatch({ type: 'clearSelection' });
    expect(handler).toHaveBeenCalledWith({ type: 'clearSelection' });

    unsubscribe();
    dispatcher.dispatch({ type: 'loadUsers' });
    expect(handler).toHaveBeenCalledOnce();
  });
});
