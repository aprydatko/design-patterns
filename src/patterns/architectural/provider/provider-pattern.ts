import type { UserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';

export type UserProviderContext = Readonly<{
  currentUser: UserProfileDto | undefined;
  selectUser: (id: string) => void;
}>;

export type UserContextConsumer<Output> = (context: UserProviderContext) => Output;

export type UserProvider = Readonly<{
  selectUser: (id: string) => void;
  getContext: () => UserProviderContext;
  provide: <Output>(consumer: UserContextConsumer<Output>) => Output;
}>;

/**
 * A Provider owns shared context and makes it available to any descendant
 * consumer. Consumers depend on the context contract, not on the data source.
 */
export const createUserProvider = (model: Pick<UserService, 'findById'>): UserProvider => {
  const mapper = createUserMapper();
  let currentUser: UserProfileDto | undefined;

  const selectUser = (id: string): void => {
    const user = model.findById(id);
    currentUser = user === undefined ? undefined : mapper.toDto(user);
  };

  const getContext = (): UserProviderContext => ({ currentUser, selectUser });

  return {
    selectUser,
    getContext,
    provide: <Output>(consumer: UserContextConsumer<Output>): Output => consumer(getContext()),
  };
};
