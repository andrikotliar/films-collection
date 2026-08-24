import { ArticlesRepository } from '~/modules/articles/articles.repository.js';
import { articlesRouter } from '~/modules/articles/articles.router.js';
import { ArticlesService } from '~/modules/articles/articles.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const ArticlesModule = createApiModule({
  services: { ArticlesRepository, ArticlesService },
  router: articlesRouter,
});
