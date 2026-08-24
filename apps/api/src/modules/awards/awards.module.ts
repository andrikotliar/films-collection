import { AwardsRepository } from '~/modules/awards/awards.repository.js';
import { awardsRouter } from '~/modules/awards/awards.router.js';
import { AwardsService } from '~/modules/awards/awards.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const AwardsModule = createApiModule({
  services: { AwardsService, AwardsRepository },
  router: awardsRouter,
});
