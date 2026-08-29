import { randomUUID } from 'node:crypto';

import type {
  User,
  UserRepository,
} from '@patterns/architectural/repository/repository-pattern.js';

export type RegisterUserCommand = Readonly<{
  name: string;
  email: string;
}>;

export type UserPersistencePort = Readonly<{
  findByEmail: (email: string) => User | undefined;
  save: (user: User) => void;
}>;

export type UserIdPort = () => string;
export type RegisterUserInputPort = Readonly<{
  execute: (command: RegisterUserCommand) => User;
}>;

export type UserRegistrationRequest = RegisterUserCommand;
export type UserRegistrationResponse = Readonly<{
  status: number;
  body: string;
}>;

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

/**
 * The core use case depends only on ports. It knows neither the repository
 * implementation nor the adapter used to invoke it.
 */
export const createRegisterUserUseCase = (
  persistence: UserPersistencePort,
  createId: UserIdPort = randomUUID,
): RegisterUserInputPort => ({
  execute: (command: RegisterUserCommand): User => {
    const name = command.name.trim();
    const email = normalizeEmail(command.email);

    if (name.length === 0 || email.length === 0) {
      throw new Error('Name and email are required');
    }

    if (persistence.findByEmail(email) !== undefined) {
      throw new Error('Email is already registered');
    }

    const user: User = { id: createId(), name, email };
    persistence.save(user);
    return user;
  },
});

/**
 * Outbound adapter translating the repository API into the persistence port
 * required by the application core.
 */
export const createRepositoryPersistenceAdapter = (
  repository: UserRepository,
): UserPersistencePort => ({
  findByEmail: (email: string): User | undefined =>
    repository.findAll().find((user) => user.email === email),
  save: (user: User): void => {
    repository.save(user);
  },
});

/**
 * Inbound adapter translating an HTTP-like request into the input port and
 * translating use-case results into a response.
 */
export const createUserRegistrationHttpAdapter = (
  inputPort: RegisterUserInputPort,
): Readonly<{
  handle: (request: UserRegistrationRequest) => UserRegistrationResponse;
}> => ({
  handle: (request: UserRegistrationRequest): UserRegistrationResponse => {
    try {
      const user = inputPort.execute(request);
      return { status: 201, body: JSON.stringify(user) };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to register user';
      return { status: 400, body: JSON.stringify({ message }) };
    }
  },
});
