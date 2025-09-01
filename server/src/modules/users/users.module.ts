import { database } from 'src/modules/database/database.module';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UsersService } from 'src/modules/users/users.service';

const repository = new UsersRepository(database);
export const users = new UsersService(repository);
