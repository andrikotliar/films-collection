import { createGenresRouter } from 'src/modules/genres/genres.router';
import { GenresRepository } from './genres.repository';
import { GenresService } from './genres.service';
import { createModule } from 'src/common';

export const GenresModule = createModule({
  prefix: 'genres',
  service: (app) => {
    const genresRepository = new GenresRepository(app.database);
    const genresService = new GenresService(genresRepository);

    return genresService;
  },
  router: createGenresRouter,
});
