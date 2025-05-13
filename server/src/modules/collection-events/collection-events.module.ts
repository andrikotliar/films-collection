import { CollectionEventsController } from './collection-events.controller';
import { CollectionEventsRepository } from './collection-events.repository';
import { CollectionEventsService } from './collection-events.service';
import { createModule } from 'src/common';

export const CollectionEventsModule = createModule({
  prefix: 'collection-events',
  service: (app) => {
    const collectionEventsRepository = new CollectionEventsRepository(
      app.database,
    );

    const service = new CollectionEventsService(
      collectionEventsRepository,
      app.filesService,
    );
    return service;
  },
  controller: CollectionEventsController,
});
