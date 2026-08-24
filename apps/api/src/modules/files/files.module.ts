import { filesRouter } from '~/modules/files/files.router.js';
import { FilesService } from '~/modules/files/files.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const FilesModule = createApiModule({
  services: { FilesService },
  router: filesRouter,
});
