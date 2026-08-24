import { CollectionsRepository } from '~/modules/collections/collections.repository.js';
import { collectionsRouter } from '~/modules/collections/collections.router.js';
import { CollectionsService } from '~/modules/collections/collections.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const CollectionsModule = createApiModule({
  services: { CollectionsRepository, CollectionsService },
  router: collectionsRouter,
});
