import { describe, expect, it } from 'vitest';

import {
  createInMemoryUserRepository,
  type User,
} from '@patterns/architectural/repository/repository-pattern.js';
import {
  createLayeredUserApplication,
  createUserApplicationLayer,
  createUserPresentationLayer,
} from '@patterns/architectural/layered-architecture/layered-architecture-pattern.js';

describe('Layered Architecture Pattern', () => {
  it('composes infrastructure, application, and presentation layers', () => {
    const application = createLayeredUserApplication(
      createInMemoryUserRepository(),
      () => 'user-1',
    );

    expect(application.registerUser({ name: 'Ada Lovelace', email: 'ada@example.com' })).toEqual({
      status: 201,
      body: '{"userId":"user-1","displayName":"Ada Lovelace","emailAddress":"ada@example.com"}',
    });
    expect(JSON.parse(application.listUsers().body)).toHaveLength(1);
  });

  it('keeps application rules independent from presentation formatting', () => {
    const repository = createInMemoryUserRepository();
    const application = createUserApplicationLayer(repository, () => 'user-1');
    const presentation = createUserPresentationLayer(application);

    application.register({ name: 'Ada Lovelace', email: 'ada@example.com' });

    expect(presentation.listUsers()).toEqual({
      status: 200,
      body: '[{"userId":"user-1","displayName":"Ada Lovelace","emailAddress":"ada@example.com"}]',
    });
    expect(repository.findAll()).toEqual([
      { id: 'user-1', name: 'Ada Lovelace', email: 'ada@example.com' },
    ] satisfies User[]);
  });

  it('translates application errors at the presentation boundary', () => {
    const application = createLayeredUserApplication(
      createInMemoryUserRepository(),
      () => 'user-1',
    );

    const response = application.registerUser({ name: '', email: 'ada@example.com' });

    expect(response.status).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ message: 'Name and email are required' });
  });
});
