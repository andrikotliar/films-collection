import { CollectionsRepository } from './collections.repository';
import { CollectionsService } from './collections.service';
import { createModule } from 'src/common';

export const CollectionsModule = createModule({
  prefix: 'collections',
  service: (app) => {
    const collectionsRepository = new CollectionsRepository(app.database);
    const collectionsService = new CollectionsService(collectionsRepository);

    return collectionsService;
  },
});
