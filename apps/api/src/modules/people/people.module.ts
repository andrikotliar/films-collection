import { database } from '~/modules/database/database.module';
import { PeopleRepository } from '~/modules/people/people.repository';
import { PeopleService } from '~/modules/people/people.service';

const repository = new PeopleRepository(database);
export const people = new PeopleService(repository);
