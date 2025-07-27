import { FilmsRepository } from './films.repository';
import { FilmsService } from './films.service';
import { createFilmsRouter } from './films.router';
import { createModule } from 'src/common';

export const FilmsModule = createModule({
  prefix: 'films',
  service: (app) => {
    const filmsRepository = new FilmsRepository(app.database);
    const service = new FilmsService(filmsRepository, {
      awardsService: app.awardsService,
      peopleService: app.peopleService,
      collectionsService: app.collectionsService,
    });

    return service;
  },
  router: createFilmsRouter,
});
