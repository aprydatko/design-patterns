import type {
  User,
  UserRepository,
} from '@patterns/architectural/repository/repository-pattern.js';
import {
  createUserService,
  type RegisterUserInput,
  type UserIdGenerator,
  type UserService,
} from '@patterns/architectural/service-layer/service-layer-pattern.js';
import type { UserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';

export type LayeredResponse = Readonly<{
  status: number;
  body: string;
}>;

export type UserApplicationLayer = Pick<UserService, 'register' | 'list'>;

export type UserPresentationLayer = Readonly<{
  registerUser: (input: RegisterUserInput) => LayeredResponse;
  listUsers: () => LayeredResponse;
}>;

/**
 * The application layer depends on the repository contract and contains use-case rules.
 * A concrete data source is supplied by the infrastructure layer at composition time.
 */
export const createUserApplicationLayer = (
  repository: UserRepository,
  createId?: UserIdGenerator,
): UserApplicationLayer => createUserService(repository, createId);

/**
 * The presentation layer translates application results into transport responses.
 * It does not access persistence or implement user business rules.
 */
export const createUserPresentationLayer = (
  application: UserApplicationLayer,
  mapper: UserMapper = createUserMapper(),
): UserPresentationLayer => ({
  registerUser: (input: RegisterUserInput): LayeredResponse => {
    try {
      const user: User = application.register(input);
      const response: UserProfileDto = mapper.toDto(user);

      return { status: 201, body: JSON.stringify(response) };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to register user';
      return { status: 400, body: JSON.stringify({ message }) };
    }
  },
  listUsers: (): LayeredResponse => {
    const response: UserProfileDto[] = application.list().map(mapper.toDto);
    return { status: 200, body: JSON.stringify(response) };
  },
});

/**
 * Composition root wiring infrastructure, application, and presentation layers together.
 */
export const createLayeredUserApplication = (
  repository: UserRepository,
  createId?: UserIdGenerator,
): UserPresentationLayer =>
  createUserPresentationLayer(createUserApplicationLayer(repository, createId));
