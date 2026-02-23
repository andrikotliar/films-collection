import { throwIfNotFound, type Deps } from '~/shared';
import {
  type CreatePersonInput,
  type GetPeopleListQuery,
  type ListOption,
  type SearchPersonQuery,
  type UpdatePersonInput,
} from '@films-collection/shared';

export class PeopleService {
  constructor(private readonly deps: Deps<'peopleRepository'>) {}

  async getList(queries: GetPeopleListQuery) {
    const list = await this.deps.peopleRepository.getList(queries);
    const total = await this.deps.peopleRepository.count(queries);

    return { list, total };
  }

  getPersonById(personId: number) {
    return throwIfNotFound(this.deps.peopleRepository.findPersonById(personId));
  }

  async searchPerson(queries: SearchPersonQuery) {
    const data = await this.deps.peopleRepository.searchPerson(queries);

    return data.map((person) => ({
      label: person.name,
      value: person.id,
    }));
  }

  createPerson(input: CreatePersonInput) {
    return throwIfNotFound(this.deps.peopleRepository.createPerson(input));
  }

  async updatePerson(id: number, input: UpdatePersonInput) {
    await throwIfNotFound(this.deps.peopleRepository.findPersonById(id));
    return throwIfNotFound(this.deps.peopleRepository.update(id, input));
  }

  async deletePerson(id: number) {
    await this.deps.peopleRepository.delete(id);
  }

  async getSelectedListOptions(): Promise<ListOption<number>[]> {
    const people = await this.deps.peopleRepository.getSelected();

    return people.map((person) => ({
      value: person.id,
      label: person.name,
    }));
  }
}
