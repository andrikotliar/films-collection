import { AwardsRepository } from './awards.repository';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { createModule } from 'src/common';

export const AwardsModule = createModule({
  prefix: 'awards',
  service: (app) => {
    const awardRepository = new AwardsRepository(app.database);
    const service = new AwardsService(awardRepository, app.filesService);
    return service;
  },
  controller: AwardsController,
});
