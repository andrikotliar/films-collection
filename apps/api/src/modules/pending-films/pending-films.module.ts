import { database } from 'src/modules/database/database.module';
import { PendingFilmsRepository } from 'src/modules/pending-films/pending-films.repository';
import { PendingFilmsService } from 'src/modules/pending-films/pending-films.service';

const repository = new PendingFilmsRepository(database);
export const pendingFilms = new PendingFilmsService(repository);
