import { UsersRepository } from '~/modules/users/users.repository.js';
import { usersRouter } from '~/modules/users/users.router.js';
import { UsersService } from '~/modules/users/users.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const UsersModule = createApiModule({
  services: { UsersService, UsersRepository },
  router: usersRouter,
});
