import { database } from '~/modules/database/database.module';
import { GenresRepository } from '~/modules/genres/genres.repository';
import { GenresService } from '~/modules/genres/genres.service';

const repository = new GenresRepository(database);
export const genres = new GenresService(repository);
