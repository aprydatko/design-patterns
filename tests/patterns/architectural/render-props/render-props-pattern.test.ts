import { describe, expect, it, vi } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import {
  createUserRenderProps,
  type UserRenderProps,
} from '@patterns/architectural/render-props/render-props-pattern.js';

describe('Render Props Pattern', () => {
  it('lets the consumer define the rendered output', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });
    const render = vi.fn(({ users, isLoading }: UserRenderProps) => ({
      count: users.length,
      isLoading,
    }));
    const provider = createUserRenderProps(service, render);

    provider.load();

    expect(provider.render()).toEqual({ count: 1, isLoading: false });
    expect(render).toHaveBeenCalledTimes(1);
  });

  it('shares actions with the render function', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });
    const provider = createUserRenderProps(
      service,
      ({ selectedUserId, selectUser }: UserRenderProps) => ({
        selectedUserId,
        selectUser,
      }),
    );

    provider.load();
    provider.render().selectUser('user-1');

    expect(provider.render().selectedUserId).toBe('user-1');
  });
});
