import type { UserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';

export type UserRenderProps = Readonly<{
  users: readonly UserProfileDto[];
  selectedUserId: string | undefined;
  isLoading: boolean;
  error: string | undefined;
  selectUser: (id: string) => void;
}>;

export type UserRenderFunction<Output> = (props: UserRenderProps) => Output;
export type UserListModel = Pick<UserService, 'findById' | 'list'>;

export type UserRenderPropsContainer<Output> = Readonly<{
  load: () => void;
  selectUser: (id: string) => void;
  render: () => Output;
}>;

/**
 * Render Props gives the consumer control over rendering while the provider
 * supplies reusable state and behavior through a function prop.
 */
export const createUserRenderProps = <Output>(
  model: UserListModel,
  render: UserRenderFunction<Output>,
): UserRenderPropsContainer<Output> => {
  const mapper = createUserMapper();
  let users: readonly UserProfileDto[] = [];
  let selectedUserId: string | undefined;
  let isLoading = false;
  let error: string | undefined;

  const selectUser = (id: string): void => {
    if (model.findById(id) === undefined) {
      selectedUserId = undefined;
      error = 'User not found';
      return;
    }

    selectedUserId = id;
    error = undefined;
  };

  return {
    load: (): void => {
      isLoading = true;
      error = undefined;

      try {
        users = model.list().map(mapper.toDto);
      } catch (cause: unknown) {
        error = cause instanceof Error ? cause.message : 'Unable to load users';
      } finally {
        isLoading = false;
      }
    },
    selectUser,
    render: (): Output => render({ users, selectedUserId, isLoading, error, selectUser }),
  };
};
