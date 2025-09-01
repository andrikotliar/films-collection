import { database } from 'src/modules/database/database.module';
import { PeopleRepository } from 'src/modules/people/people.repository';
import { PeopleService } from 'src/modules/people/people.service';

const repository = new PeopleRepository(database);
export const people = new PeopleService(repository);
