import { database } from '~/modules/database/database.module';
import { StudiosRepository } from '~/modules/studios/studios.repository';
import { StudiosService } from '~/modules/studios/studios.service';

const repository = new StudiosRepository(database);
export const studios = new StudiosService(repository);
