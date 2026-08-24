import { GenresRepository } from '~/modules/genres/genres.repository.js';
import { genresRouter } from '~/modules/genres/genres.router.js';
import { GenresService } from '~/modules/genres/genres.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const GenresModule = createApiModule({
  services: { GenresService, GenresRepository },
  router: genresRouter,
});
