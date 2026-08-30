import { describe, expect, it, vi } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import {
  createUserListContainer,
  renderUserList,
} from '@patterns/architectural/container-presentational/container-presentational-pattern.js';

describe('Container / Presentational Pattern', () => {
  it('keeps model access in the container and passes view-ready props', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ADA@example.com' });
    const container = createUserListContainer(service);

    container.load();

    expect(container.render()).toMatchObject({
      status: 'ready',
      rows: [{ id: 'user-1', label: 'Ada Lovelace', email: 'ada@example.com' }],
    });
  });

  it('keeps the presentational layer pure and injectable', () => {
    const presentational = vi.fn(renderUserList);
    const container = createUserListContainer({ list: () => [] }, presentational);

    container.render();

    expect(presentational).toHaveBeenCalledWith(
      expect.objectContaining({ users: [], isLoading: false }),
    );
  });
});
