import { awards } from 'src/modules/awards/awards.module';
import { collections } from 'src/modules/collections/collections.module';
import { database } from 'src/modules/database/database.module';
import { FilmsRepository } from 'src/modules/films/films.repository';
import { FilmsService } from 'src/modules/films/films.service';
import { people } from 'src/modules/people/people.module';

const repository = new FilmsRepository(database);
export const films = new FilmsService(repository, people, awards, collections);
