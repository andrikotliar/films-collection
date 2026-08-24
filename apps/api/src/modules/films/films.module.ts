import { FilmsRepository } from '~/modules/films/films.repository.js';
import { filmsRouter } from '~/modules/films/films.router.js';
import { FilmsService } from '~/modules/films/films.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const FilmsModule = createApiModule({
  services: {
    FilmsService,
    FilmsRepository,
  },
  router: filmsRouter,
});
