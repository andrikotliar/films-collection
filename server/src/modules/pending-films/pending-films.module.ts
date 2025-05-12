import { createModule } from 'src/common';
import { PendingFilmsRepository } from './pending-films.repository';
import { PendingFilmsService } from './pending-films.service';
import { PendingFilmsController } from './pending-films.controller';

export const PendingFilmsModule = createModule({
  prefix: 'pending-films',
  service: (app) => {
    const pendingFilmsRepository = new PendingFilmsRepository(app.database);
    const service = new PendingFilmsService(pendingFilmsRepository);

    return service;
  },
  controller: PendingFilmsController,
});
