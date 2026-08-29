import type { User } from '@patterns/architectural/repository/repository-pattern.js';
import type { UserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import type { UserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';
import { createUserMapper } from '@patterns/architectural/mapper/mapper-pattern.js';
import type { UserProfileDto } from '@patterns/architectural/dto/dto-pattern.js';

export type HttpResponse = Readonly<{
  status: number;
  body: string;
}>;

export type UserModel = Pick<UserService, 'findById' | 'list'>;

export type UserView = Readonly<{
  renderProfile: (user: User) => HttpResponse;
  renderProfiles: (users: readonly User[]) => HttpResponse;
  renderNotFound: () => HttpResponse;
}>;

export type UserController = Readonly<{
  showProfile: (id: string) => HttpResponse;
  showProfiles: () => HttpResponse;
}>;

/**
 * MVC separates the Model, which owns application data, from the View, which
 * presents it, and the Controller, which coordinates a request between them.
 */
export const createJsonUserView = (mapper: UserMapper = createUserMapper()): UserView => ({
  renderProfile: (user: User): HttpResponse => ({
    status: 200,
    body: JSON.stringify(mapper.toDto(user)),
  }),
  renderProfiles: (users: readonly User[]): HttpResponse => {
    const profiles: UserProfileDto[] = users.map(mapper.toDto);

    return {
      status: 200,
      body: JSON.stringify(profiles),
    };
  },
  renderNotFound: (): HttpResponse => ({
    status: 404,
    body: JSON.stringify({ message: 'User not found' }),
  }),
});

export const createUserController = (model: UserModel, view: UserView): UserController => ({
  showProfile: (id: string): HttpResponse => {
    const user = model.findById(id);

    if (user === undefined) {
      return view.renderNotFound();
    }

    return view.renderProfile(user);
  },
  showProfiles: (): HttpResponse => view.renderProfiles(model.list()),
});
