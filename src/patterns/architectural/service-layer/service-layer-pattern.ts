import { randomUUID } from 'node:crypto';

import type {
  User,
  UserRepository,
} from '@patterns/architectural/repository/repository-pattern.js';

export type RegisterUserInput = Readonly<{
  name: string;
  email: string;
}>;

export type UserService = Readonly<{
  register: (input: RegisterUserInput) => User;
  findById: (id: string) => User | undefined;
  list: () => User[];
  remove: (id: string) => boolean;
}>;

export type UserIdGenerator = () => string;

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

/**
 * Service Layer coordinates use cases and business rules above persistence details.
 * The service depends on the repository contract, not on a concrete data source.
 */
export const createUserService = (
  repository: UserRepository,
  createId: UserIdGenerator = randomUUID,
): UserService => ({
  register: (input: RegisterUserInput): User => {
    const name = input.name.trim();
    const email = normalizeEmail(input.email);

    if (name.length === 0 || email.length === 0) {
      throw new Error('Name and email are required');
    }

    if (repository.findAll().some((user) => user.email === email)) {
      throw new Error('Email is already registered');
    }

    const user: User = { id: createId(), name, email };
    repository.save(user);
    return user;
  },
  findById: (id: string): User | undefined => repository.findById(id),
  list: (): User[] => repository.findAll(),
  remove: (id: string): boolean => repository.deleteById(id),
});
