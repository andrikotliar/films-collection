import { createModule } from 'src/common';
import { PendingFilmsRepository } from './pending-films.repository';
import { PendingFilmsService } from './pending-films.service';
import { createPendingFilmsRouter } from './pending-films.router';

export const PendingFilmsModule = createModule({
  prefix: 'pending-films',
  service: (app) => {
    const pendingFilmsRepository = new PendingFilmsRepository(app.database);
    const service = new PendingFilmsService(pendingFilmsRepository);

    return service;
  },
  router: createPendingFilmsRouter,
});
