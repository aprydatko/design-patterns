export type UserProfile = Readonly<{
  id: string;
  name: string;
}>;

export type ProfileService = Readonly<{
  getProfile: (userId: string) => UserProfile | undefined;
}>;

export class UserProfileService implements ProfileService {
  public constructor(private readonly profiles: ReadonlyMap<string, UserProfile>) {}

  getProfile = (userId: string): UserProfile | undefined => this.profiles.get(userId);
}

/**
 * Proxy Pattern provides the same interface as a service while controlling access to it.
 */
export class CachingProfileProxy implements ProfileService {
  private readonly cache = new Map<string, UserProfile | undefined>();

  public constructor(private readonly service: ProfileService) {}

  getProfile = (userId: string): UserProfile | undefined => {
    if (this.cache.has(userId)) {
      return this.cache.get(userId);
    }

    const profile = this.service.getProfile(userId);
    this.cache.set(userId, profile);
    return profile;
  };
}
