import { createModule } from 'src/common';
import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';
import { createPeopleRouter } from './people.router';

export const PeopleModule = createModule({
  prefix: 'people',
  service: (app) => {
    const peopleRepository = new PeopleRepository(app.database);
    const peopleService = new PeopleService(peopleRepository);

    return peopleService;
  },
  router: createPeopleRouter,
});
