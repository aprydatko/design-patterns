import { describe, expect, it } from 'vitest';

import {
  createInMemoryUserRepository,
  type User,
} from '@patterns/architectural/repository/repository-pattern.js';

const ada: User = {
  id: 'user-1',
  name: 'Ada Lovelace',
  email: 'ada@example.com',
};

describe('Repository Pattern', () => {
  it('retrieves entities through a persistence-agnostic contract', () => {
    const repository = createInMemoryUserRepository([ada]);

    expect(repository.findById('user-1')).toEqual(ada);
    expect(repository.findById('missing-user')).toBeUndefined();
  });

  it('supports saving new entities and replacing existing ones', () => {
    const repository = createInMemoryUserRepository();
    const updatedAda = { ...ada, name: 'Ada Byron Lovelace' };

    repository.save(ada);
    repository.save(updatedAda);

    expect(repository.findAll()).toEqual([updatedAda]);
  });

  it('deletes an entity and reports whether it existed', () => {
    const repository = createInMemoryUserRepository([ada]);

    expect(repository.deleteById('user-1')).toBe(true);
    expect(repository.deleteById('user-1')).toBe(false);
    expect(repository.findAll()).toEqual([]);
  });
});
