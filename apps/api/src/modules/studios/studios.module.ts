import { database } from 'src/modules/database/database.module';
import { StudiosRepository } from 'src/modules/studios/studios.repository';
import { StudiosService } from 'src/modules/studios/studios.service';

const repository = new StudiosRepository(database);
export const studios = new StudiosService(repository);
