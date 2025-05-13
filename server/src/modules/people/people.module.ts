import { createModule } from 'src/common';
import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';

export const PeopleModule = createModule({
  prefix: 'people',
  service: (app) => {
    const peopleRepository = new PeopleRepository(app.database);
    const peopleService = new PeopleService(peopleRepository);

    return peopleService;
  },
  controller: PeopleController,
});
