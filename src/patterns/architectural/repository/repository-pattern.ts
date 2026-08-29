export type User = Readonly<{
  id: string;
  name: string;
  email: string;
}>;

export type UserRepository = Readonly<{
  findById: (id: string) => User | undefined;
  findAll: () => User[];
  save: (user: User) => void;
  deleteById: (id: string) => boolean;
}>;

/**
 * Repository Pattern hides persistence details behind a collection-like contract.
 * Application code depends on UserRepository instead of a database or data structure.
 */
export const createInMemoryUserRepository = (
  initialUsers: readonly User[] = [],
): UserRepository => {
  const users = new Map<string, User>(initialUsers.map((user) => [user.id, user]));

  return {
    findById: (id: string): User | undefined => users.get(id),
    findAll: (): User[] => [...users.values()],
    save: (user: User): void => {
      users.set(user.id, user);
    },
    deleteById: (id: string): boolean => users.delete(id),
  };
};
