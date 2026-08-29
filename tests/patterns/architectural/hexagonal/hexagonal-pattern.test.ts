import { describe, expect, it, vi } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import {
  createRegisterUserUseCase,
  createRepositoryPersistenceAdapter,
  createUserRegistrationHttpAdapter,
} from '@patterns/architectural/hexagonal/hexagonal-pattern.js';

describe('Hexagonal Architecture Pattern', () => {
  it('keeps the core use case independent from concrete infrastructure', () => {
    const savedUsers: Array<{ id: string; name: string; email: string }> = [];
    const useCase = createRegisterUserUseCase(
      {
        findByEmail: (email) => savedUsers.find((user) => user.email === email),
        save: (user) => {
          savedUsers.push(user);
        },
      },
      () => 'user-1',
    );

    expect(useCase.execute({ name: 'Ada Lovelace', email: ' ADA@EXAMPLE.COM ' })).toEqual({
      id: 'user-1',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
    expect(savedUsers).toHaveLength(1);
  });

  it('adapts the repository port without exposing repository operations to the core', () => {
    const repository = createInMemoryUserRepository();
    const useCase = createRegisterUserUseCase(
      createRepositoryPersistenceAdapter(repository),
      () => 'user-1',
    );

    useCase.execute({ name: 'Ada Lovelace', email: 'ada@example.com' });

    expect(repository.findById('user-1')).toEqual({
      id: 'user-1',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
  });

  it('adapts external requests and use-case errors at the inbound boundary', () => {
    const execute = vi.fn(() => {
      throw new Error('Email is already registered');
    });
    const adapter = createUserRegistrationHttpAdapter({ execute });

    expect(adapter.handle({ name: 'Another Ada', email: 'ada@example.com' })).toEqual({
      status: 400,
      body: '{"message":"Email is already registered"}',
    });
    expect(execute).toHaveBeenCalledOnce();
  });
});
