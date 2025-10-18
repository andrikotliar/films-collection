import { awards } from '~/modules/awards/awards.module';
import { collections } from '~/modules/collections/collections.module';
import { database } from '~/modules/database/database.module';
import { FilmsRepository } from '~/modules/films/films.repository';
import { FilmsService } from '~/modules/films/films.service';
import { people } from '~/modules/people/people.module';

const repository = new FilmsRepository(database);
export const films = new FilmsService(repository, people, awards, collections);
