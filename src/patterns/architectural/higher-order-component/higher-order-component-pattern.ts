import type { UserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';

export type Component<Props, Output> = (props: Props) => Output;

export type UserDetailsProps = Readonly<{
  user: UserProfileDto;
  heading: string;
}>;

export type UserDetailsView = Readonly<{
  heading: string;
  displayName: string;
  email: string;
}>;

export type WithUserProps = Readonly<{
  userId: string;
}>;

export type EnhancedUserProps<Props> = Omit<Props, 'user'> & WithUserProps;

export type UserAwareView<Props, Output> = Component<EnhancedUserProps<Props>, Output>;

/** A base component owns presentation and receives all of its data as props. */
export const renderUserDetails: Component<UserDetailsProps, UserDetailsView> = ({
  user,
  heading,
}) => ({
  heading,
  displayName: user.displayName,
  email: user.emailAddress,
});

/**
 * A Higher-Order Component wraps a component and injects a cross-cutting data
 * concern. The wrapped component remains unaware of the service or lookup.
 */
export const withUser = <Props extends { user: UserProfileDto }, Output>(
  model: Pick<UserService, 'findById'>,
  component: Component<Props, Output>,
): Component<EnhancedUserProps<Props>, Output | { error: string }> => {
  const mapper = createUserMapper();

  return (props: EnhancedUserProps<Props>): Output | { error: string } => {
    const user = model.findById(props.userId);

    if (user === undefined) {
      return { error: 'User not found' };
    }

    const ownProps = Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'userId'));
    return component({ ...ownProps, user: mapper.toDto(user) } as unknown as Props);
  };
};
