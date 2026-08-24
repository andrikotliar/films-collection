import { CollectionEventsRepository } from '~/modules/collection-events/collection-events.repository.js';
import { collectionEventsRouter } from '~/modules/collection-events/collection-events.router.js';
import { CollectionEventsService } from '~/modules/collection-events/collection-events.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const CollectionEventsModule = createApiModule({
  services: { CollectionEventsService, CollectionEventsRepository },
  router: collectionEventsRouter,
});
