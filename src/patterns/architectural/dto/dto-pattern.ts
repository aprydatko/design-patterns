import type { User } from '@patterns/architectural/repository/repository-pattern.js';
import type { UserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';

export type UserProfileDto = Readonly<{
  userId: string;
  displayName: string;
  emailAddress: string;
}>;

export type UserProfileApi = Readonly<{
  getProfile: (id: string) => UserProfileDto | undefined;
  listProfiles: () => UserProfileDto[];
}>;

export type UserProfileReader = Pick<UserService, 'findById' | 'list'>;

/**
 * Data Transfer Object keeps the external contract separate from a domain entity.
 * Only the fields required by the profile API cross the application boundary.
 */
export const createUserProfileDto = (user: User): UserProfileDto => ({
  userId: user.id,
  displayName: user.name,
  emailAddress: user.email,
});

export const createUserProfileApi = (users: UserProfileReader): UserProfileApi => ({
  getProfile: (id: string): UserProfileDto | undefined => {
    const user = users.findById(id);

    if (user === undefined) {
      return undefined;
    }

    return createUserProfileDto(user);
  },
  listProfiles: (): UserProfileDto[] => users.list().map(createUserProfileDto),
});
