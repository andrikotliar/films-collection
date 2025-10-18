import { database } from '~/modules/database/database.module';
import { UsersRepository } from '~/modules/users/users.repository';
import { UsersService } from '~/modules/users/users.service';

const repository = new UsersRepository(database);
export const users = new UsersService(repository);
