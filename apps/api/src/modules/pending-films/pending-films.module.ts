import { database } from '~/modules/database/database.module';
import { PendingFilmsRepository } from '~/modules/pending-films/pending-films.repository';
import { PendingFilmsService } from '~/modules/pending-films/pending-films.service';

const repository = new PendingFilmsRepository(database);
export const pendingFilms = new PendingFilmsService(repository);
