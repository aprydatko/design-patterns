import type { User } from '@patterns/architectural/repository/repository-pattern.js';
import type { UserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';
import type { UserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';

export type UserAction =
  | Readonly<{ type: 'loadUsers' }>
  | Readonly<{ type: 'selectUser'; userId: string }>
  | Readonly<{ type: 'clearSelection' }>;

export type UserFluxState = Readonly<{
  users: readonly UserProfileDto[];
  selectedUserId: string | undefined;
  isLoading: boolean;
  error: string | undefined;
}>;

export type UserModel = Pick<UserService, 'findById' | 'list'>;
export type UserActionHandler = (action: UserAction) => void;
export type UserStateListener = (state: UserFluxState) => void;

export type UserDispatcher = Readonly<{
  dispatch: (action: UserAction) => void;
  subscribe: (handler: UserActionHandler) => () => void;
}>;

export type UserStore = Readonly<{
  getState: () => UserFluxState;
  dispatch: (action: UserAction) => void;
  subscribe: (listener: UserStateListener) => () => void;
}>;

const initialState: UserFluxState = {
  users: [],
  selectedUserId: undefined,
  isLoading: false,
  error: undefined,
};

/**
 * Flux sends actions through a dispatcher to a store, which updates state and
 * notifies the View. Data therefore flows in one direction.
 */
export const createUserDispatcher = (): UserDispatcher => {
  const handlers = new Set<UserActionHandler>();

  return {
    dispatch: (action: UserAction): void => {
      handlers.forEach((handler) => {
        handler(action);
      });
    },
    subscribe: (handler: UserActionHandler): (() => void) => {
      handlers.add(handler);
      return (): void => {
        handlers.delete(handler);
      };
    },
  };
};

export const createUserStore = (
  model: UserModel,
  dispatcher: UserDispatcher,
  mapper: UserMapper = createUserMapper(),
): UserStore => {
  let state = initialState;
  const listeners = new Set<UserStateListener>();

  const update = (nextState: UserFluxState): void => {
    state = nextState;
    listeners.forEach((listener) => {
      listener(state);
    });
  };

  const handleAction = (action: UserAction): void => {
    if (action.type === 'loadUsers') {
      update({ ...state, isLoading: true, error: undefined });

      try {
        const users: UserProfileDto[] = model.list().map(mapper.toDto);
        update({ ...state, users, isLoading: false });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unable to load users';
        update({ ...state, isLoading: false, error: message });
      }
      return;
    }

    if (action.type === 'selectUser') {
      const user: User | undefined = model.findById(action.userId);

      if (user === undefined) {
        update({ ...state, selectedUserId: undefined, error: 'User not found' });
        return;
      }

      update({ ...state, selectedUserId: user.id, error: undefined });
      return;
    }

    update({ ...state, selectedUserId: undefined, error: undefined });
  };

  dispatcher.subscribe(handleAction);

  return {
    getState: (): UserFluxState => state,
    dispatch: (action: UserAction): void => {
      dispatcher.dispatch(action);
    },
    subscribe: (listener: UserStateListener): (() => void) => {
      listeners.add(listener);
      return (): void => {
        listeners.delete(listener);
      };
    },
  };
};
