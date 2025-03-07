import { PeopleRepository } from './people.repository';

export class PeopleService {
  constructor(private peopleRepository: PeopleRepository) {}

  async getPersonById(personId: number) {
    return this.peopleRepository.findPersonById(personId);
  }
}
