import { describe, expect, it } from 'vitest';

import type { User } from '@patterns/architectural/repository/repository-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';

const user: User = {
  id: 'user-1',
  name: 'Ada Lovelace',
  email: 'ada@example.com',
};

const dto: UserProfileDto = {
  userId: 'user-1',
  displayName: 'Ada Lovelace',
  emailAddress: 'ada@example.com',
};

describe('Mapper Pattern', () => {
  it('maps a domain entity to an explicit transport representation', () => {
    const mapper = createUserMapper();

    expect(mapper.toDto(user)).toEqual(dto);
  });

  it('maps a DTO back to the domain representation', () => {
    const mapper = createUserMapper();

    expect(mapper.toDomain(dto)).toEqual(user);
  });

  it('creates independent objects at the boundary', () => {
    const mapper = createUserMapper();
    const mappedDto = mapper.toDto(user);
    const mappedUser = mapper.toDomain(dto);

    expect(mappedDto).not.toBe(user);
    expect(mappedUser).not.toBe(dto);
  });
});
