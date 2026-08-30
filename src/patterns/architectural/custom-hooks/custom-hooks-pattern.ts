import type { UserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';

export type UserListHookState = Readonly<{
  users: readonly UserProfileDto[];
  selectedUserId: string | undefined;
  isLoading: boolean;
  error: string | undefined;
}>;

export type UserListHook = Readonly<{
  getState: () => UserListHookState;
  load: () => void;
  selectUser: (id: string) => void;
}>;

export type UserListHookModel = Pick<UserService, 'findById' | 'list'>;

/**
 * A custom hook packages reusable stateful behavior behind a small contract.
 * Rendering remains the responsibility of the component that consumes it.
 */
export const useUserList = (model: UserListHookModel): UserListHook => {
  const mapper = createUserMapper();
  let state: UserListHookState = {
    users: [],
    selectedUserId: undefined,
    isLoading: false,
    error: undefined,
  };

  return {
    getState: (): UserListHookState => state,
    load: (): void => {
      state = { ...state, isLoading: true, error: undefined };

      try {
        state = {
          ...state,
          users: model.list().map(mapper.toDto),
          isLoading: false,
        };
      } catch (cause: unknown) {
        state = {
          ...state,
          isLoading: false,
          error: cause instanceof Error ? cause.message : 'Unable to load users',
        };
      }
    },
    selectUser: (id: string): void => {
      if (model.findById(id) === undefined) {
        state = { ...state, selectedUserId: undefined, error: 'User not found' };
        return;
      }

      state = { ...state, selectedUserId: id, error: undefined };
    },
  };
};
