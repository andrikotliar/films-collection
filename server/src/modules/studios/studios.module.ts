import { createModule } from 'src/common';
import { createStudiosRouter } from './studios.router';
import { StudiosRepository } from './studios.repository';
import { StudiosService } from './studios.service';

export const StudiosModule = createModule({
  prefix: 'studios',
  service: (app) => {
    const studiosRepository = new StudiosRepository(app.database);
    const studiosService = new StudiosService(studiosRepository);

    return studiosService;
  },
  router: createStudiosRouter,
});
