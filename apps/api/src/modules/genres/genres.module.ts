import { database } from 'src/modules/database/database.module';
import { GenresRepository } from 'src/modules/genres/genres.repository';
import { GenresService } from 'src/modules/genres/genres.service';

const repository = new GenresRepository(database);
export const genres = new GenresService(repository);
