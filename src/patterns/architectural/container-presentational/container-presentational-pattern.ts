import type { UserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';

export type UserListPresentationalProps = Readonly<{
  users: readonly UserProfileDto[];
  selectedUserId: string | undefined;
  isLoading: boolean;
  error: string | undefined;
  onSelectUser: (userId: string) => void;
}>;

export type UserListRenderModel = Readonly<{
  status: 'idle' | 'loading' | 'ready' | 'error';
  rows: readonly Readonly<{ id: string; label: string; email: string }>[];
  selectedUserId: string | undefined;
  onSelectUser: (userId: string) => void;
  error: string | undefined;
}>;

export type UserListPresentational = (props: UserListPresentationalProps) => UserListRenderModel;

export type UserListContainer = Readonly<{
  load: () => void;
  selectUser: (userId: string) => void;
  render: () => UserListRenderModel;
}>;

export type UserListModel = Pick<UserService, 'list'>;

/**
 * Presentational code only transforms props into UI output. It owns no data access
 * and can be used with any UI framework or tested as a pure function.
 */
export const renderUserList = (props: UserListPresentationalProps): UserListRenderModel => ({
  status:
    props.error !== undefined
      ? 'error'
      : props.isLoading
        ? 'loading'
        : props.users.length === 0
          ? 'idle'
          : 'ready',
  rows: props.users.map(({ userId, displayName, emailAddress }) => ({
    id: userId,
    label: displayName,
    email: emailAddress,
  })),
  selectedUserId: props.selectedUserId,
  onSelectUser: props.onSelectUser,
  error: props.error,
});

/**
 * The container owns the model interaction and supplies stable, view-ready props
 * to the presentational function.
 */
export const createUserListContainer = (
  model: UserListModel,
  presentational: UserListPresentational = renderUserList,
): UserListContainer => {
  const mapper = createUserMapper();
  let users: readonly UserProfileDto[] = [];
  let isLoading = false;
  let error: string | undefined;
  let selectedUserId: string | undefined;

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
    selectUser: (userId: string): void => {
      selectedUserId = users.some((user) => user.userId === userId) ? userId : undefined;
    },
    render: (): UserListRenderModel =>
      presentational({
        users,
        selectedUserId,
        isLoading,
        error,
        onSelectUser: (userId) => {
          selectedUserId = userId;
        },
      }),
  };
};
