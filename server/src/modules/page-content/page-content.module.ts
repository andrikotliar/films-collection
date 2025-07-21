import { createModule } from 'src/common';
import { PageContentController } from './page-content.controller';
import { PageContentRepository } from './page-content.repository';
import { PageContentService } from './page-content.service';

export const PageContent = createModule({
  prefix: 'page-content',
  service: (app) => {
    const repository = new PageContentRepository(app.database);
    const service = new PageContentService(repository);

    return service;
  },
  controller: PageContentController,
});
