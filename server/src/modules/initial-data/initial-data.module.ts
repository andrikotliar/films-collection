import { InitialDataService } from './initial-data.service';
import { InitialDataController } from './initial-data.controller';
import { createModule } from 'src/common';

export const InitialDataModule = createModule({
  prefix: 'initial-data',
  service: (app) => {
    const service = new InitialDataService({
      collectionsService: app.collectionsService,
      genresService: app.genresService,
      countriesService: app.countriesService,
      studiosService: app.studiosService,
      collectionEventsService: app.collectionEventsService,
      awardsService: app.awardsService,
    });

    return service;
  },
  controller: InitialDataController,
});
