import type { User } from '@patterns/architectural/repository/repository-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';

export type UserMapper = Readonly<{
  toDto: (user: User) => UserProfileDto;
  toDomain: (dto: UserProfileDto) => User;
}>;

/**
 * Mapper Pattern centralizes conversion between representations with different contracts.
 * The domain model and transport DTO can evolve independently of one another.
 */
export const createUserMapper = (): UserMapper => ({
  toDto: (user: User): UserProfileDto => ({
    userId: user.id,
    displayName: user.name,
    emailAddress: user.email,
  }),
  toDomain: (dto: UserProfileDto): User => ({
    id: dto.userId,
    name: dto.displayName,
    email: dto.emailAddress,
  }),
});
