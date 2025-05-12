import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { createModule } from 'src/common';

export const UsersModule = createModule({
  prefix: 'users',
  service: (app) => {
    const usersRepository = new UsersRepository(app.database);
    const usersService = new UsersService(usersRepository);

    return usersService;
  },
});
