import type { User } from '@patterns/architectural/repository/repository-pattern.js';
import type { UserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';
import type { UserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';

export type UserViewModelState = Readonly<{
  users: readonly UserProfileDto[];
  selectedUser: UserProfileDto | undefined;
  isLoading: boolean;
  error: string | undefined;
}>;

export type UserModel = Pick<UserService, 'findById' | 'list'>;
export type UserViewModelListener = (state: UserViewModelState) => void;

export type UserViewModel = Readonly<{
  getState: () => UserViewModelState;
  load: () => void;
  selectUser: (id: string) => void;
  subscribe: (listener: UserViewModelListener) => () => void;
}>;

const initialState: UserViewModelState = {
  users: [],
  selectedUser: undefined,
  isLoading: false,
  error: undefined,
};

/**
 * MVVM exposes view-ready state and commands without making the View know the Model.
 * Subscribers provide the data-binding mechanism used by a UI.
 */
export const createUserViewModel = (
  model: UserModel,
  mapper: UserMapper = createUserMapper(),
): UserViewModel => {
  let state = initialState;
  const listeners = new Set<UserViewModelListener>();

  const update = (nextState: UserViewModelState): void => {
    state = nextState;
    listeners.forEach((listener) => {
      listener(state);
    });
  };

  return {
    getState: (): UserViewModelState => state,
    load: (): void => {
      update({ ...state, isLoading: true, error: undefined });

      try {
        const users: UserProfileDto[] = model.list().map(mapper.toDto);
        update({ ...state, users, isLoading: false });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unable to load users';
        update({ ...state, isLoading: false, error: message });
      }
    },
    selectUser: (id: string): void => {
      const user: User | undefined = model.findById(id);

      if (user === undefined) {
        update({ ...state, selectedUser: undefined, error: 'User not found' });
        return;
      }

      update({ ...state, selectedUser: mapper.toDto(user), error: undefined });
    },
    subscribe: (listener: UserViewModelListener): (() => void) => {
      listeners.add(listener);
      return (): void => {
        listeners.delete(listener);
      };
    },
  };
};
