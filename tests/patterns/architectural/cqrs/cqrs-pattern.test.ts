import { describe, expect, it, vi } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import {
  createCqrsUserApplication,
  createUserCommandHandler,
  createUserQueryHandler,
} from '@patterns/architectural/cqrs/cqrs-pattern.js';

describe('CQRS Pattern', () => {
  it('separates state-changing commands from read queries', () => {
    const application = createCqrsUserApplication(createInMemoryUserRepository(), () => 'user-1');

    application.commands.register({ name: 'Ada Lovelace', email: 'ada@example.com' });

    expect(application.queries.findById('user-1')).toEqual({
      userId: 'user-1',
      displayName: 'Ada Lovelace',
      emailAddress: 'ada@example.com',
    });
    expect(application.queries.list()).toHaveLength(1);
  });

  it('keeps command validation and writes on the write port', () => {
    const save = vi.fn();
    const handler = createUserCommandHandler(
      {
        findByEmail: () => undefined,
        save,
        deleteById: () => false,
      },
      () => 'user-1',
    );

    expect(handler.register({ name: ' Ada Lovelace ', email: ' ADA@EXAMPLE.COM ' })).toEqual({
      id: 'user-1',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
    expect(save).toHaveBeenCalledOnce();
  });

  it('keeps query projections read-only and independent from commands', () => {
    const findById = vi.fn(() => ({
      id: 'user-1',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    }));
    const queryHandler = createUserQueryHandler({
      findById,
      findAll: () => [],
    });

    expect(queryHandler.findById('user-1')).toEqual({
      userId: 'user-1',
      displayName: 'Ada Lovelace',
      emailAddress: 'ada@example.com',
    });
    expect(findById).toHaveBeenCalledWith('user-1');
  });
});
