import { PeopleRepository } from '~/modules/people/people.repository.js';
import { peopleRouter } from '~/modules/people/people.router.js';
import { PeopleService } from '~/modules/people/people.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const PeopleModule = createApiModule({
  services: { PeopleService, PeopleRepository },
  router: peopleRouter,
});
