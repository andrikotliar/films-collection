import { StudiosRepository } from './studios.repository';
import { StudiosService } from './studios.service';
import { createModule } from 'src/common';

export const StudiosModule = createModule({
  prefix: 'studios',
  service: (app) => {
    const studiosRepository = new StudiosRepository(app.database);
    const studiosService = new StudiosService(studiosRepository);

    return studiosService;
  },
});
