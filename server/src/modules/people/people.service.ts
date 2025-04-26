import {
  CreatePersonPayload,
  SearchPersonQuery,
} from 'src/modules/people/schemas';
import { PeopleRepository } from './people.repository';

export class PeopleService {
  constructor(private peopleRepository: PeopleRepository) {}

  async getPersonById(personId: number) {
    return this.peopleRepository.findPersonById(personId);
  }

  async searchPersonByTitle(queries: SearchPersonQuery) {
    return this.peopleRepository.searchPersonByName(queries);
  }

  async createPerson(data: CreatePersonPayload) {
    return this.peopleRepository.createPerson(data);
  }
}
