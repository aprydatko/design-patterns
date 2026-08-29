import { randomUUID } from 'node:crypto';

import type {
  User,
  UserRepository,
} from '@patterns/architectural/repository/repository-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';
import type { UserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';

export type RegisterUserCommand = Readonly<{
  name: string;
  email: string;
}>;

export type UserWritePort = Readonly<{
  findByEmail: (email: string) => User | undefined;
  save: (user: User) => void;
  deleteById: (id: string) => boolean;
}>;

export type UserReadPort = Readonly<{
  findById: (id: string) => User | undefined;
  findAll: () => User[];
}>;

export type UserCommandHandler = Readonly<{
  register: (command: RegisterUserCommand) => User;
  remove: (userId: string) => boolean;
}>;

export type UserQueryHandler = Readonly<{
  findById: (userId: string) => UserProfileDto | undefined;
  list: () => UserProfileDto[];
}>;

export type CqrsUserApplication = Readonly<{
  commands: UserCommandHandler;
  queries: UserQueryHandler;
}>;

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

/**
 * Commands mutate state through a write-specific port and return domain results.
 * They do not depend on the query model or read projection.
 */
export const createUserCommandHandler = (
  writePort: UserWritePort,
  createId: () => string = randomUUID,
): UserCommandHandler => ({
  register: (command: RegisterUserCommand): User => {
    const name = command.name.trim();
    const email = normalizeEmail(command.email);

    if (name.length === 0 || email.length === 0) {
      throw new Error('Name and email are required');
    }

    if (writePort.findByEmail(email) !== undefined) {
      throw new Error('Email is already registered');
    }

    const user: User = { id: createId(), name, email };
    writePort.save(user);
    return user;
  },
  remove: (userId: string): boolean => writePort.deleteById(userId),
});

/**
 * Queries read through a read-specific port and return transport-ready projections.
 * They do not mutate state or call the command side.
 */
export const createUserQueryHandler = (
  readPort: UserReadPort,
  mapper: UserMapper = createUserMapper(),
): UserQueryHandler => ({
  findById: (userId: string): UserProfileDto | undefined => {
    const user = readPort.findById(userId);

    if (user === undefined) {
      return undefined;
    }

    return mapper.toDto(user);
  },
  list: (): UserProfileDto[] => readPort.findAll().map(mapper.toDto),
});

/**
 * Adapter for the learning repository. In production, write and read ports can
 * point to different stores or projections without changing either handler.
 */
export const createCqrsUserApplication = (
  repository: UserRepository,
  createId?: () => string,
): CqrsUserApplication => {
  const writePort: UserWritePort = {
    findByEmail: (email: string): User | undefined =>
      repository.findAll().find((user) => user.email === email),
    save: (user: User): void => {
      repository.save(user);
    },
    deleteById: (userId: string): boolean => repository.deleteById(userId),
  };
  const readPort: UserReadPort = {
    findById: (userId: string): User | undefined => repository.findById(userId),
    findAll: (): User[] => repository.findAll(),
  };

  return {
    commands: createUserCommandHandler(writePort, createId),
    queries: createUserQueryHandler(readPort),
  };
};
