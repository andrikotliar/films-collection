import { StudiosRepository } from '~/modules/studios/studios.repository.js';
import { studiosRouter } from '~/modules/studios/studios.router.js';
import { StudiosService } from '~/modules/studios/studios.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const StudiosModule = createApiModule({
  services: { StudiosService, StudiosRepository },
  router: studiosRouter,
});
