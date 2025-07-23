import { AwardsRepository } from './awards.repository';
import { AwardsService } from './awards.service';
import { createAwardsRouter } from './awards.router';
import { createModule } from 'src/common';

export const AwardsModule = createModule({
  prefix: 'awards',
  service: (app) => {
    const awardRepository = new AwardsRepository(app.database);
    const service = new AwardsService(awardRepository);
    return service;
  },
  router: createAwardsRouter,
});
