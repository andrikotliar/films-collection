import { initialDataRouter } from '~/modules/initial-data/initial-data.router.js';
import { InitialDataService } from '~/modules/initial-data/initial-data.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const InitialDataModule = createApiModule({
  services: { InitialDataService },
  router: initialDataRouter,
});
