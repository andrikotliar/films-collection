import {
  PAGE_LIMITS,
  type CreatePersonInput,
  type GetPeopleListQuery,
  type ListOption,
  type PeopleListResponse,
  type SearchPersonQuery,
  type UpdatePersonInput,
} from '@films-collection/shared';
import { throwIfNotFound } from '~/shared/helpers/throw-if-not-found.js';
import type { Deps } from '~/shared/types/deps.js';

export class PeopleService {
  constructor(private readonly deps: Deps<'peopleRepository'>) {}

  async getList(queries: GetPeopleListQuery): Promise<PeopleListResponse> {
    const list = await this.deps.peopleRepository.getList(queries);
    const total = await this.deps.peopleRepository.count(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
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

  getAll() {
    return this.deps.peopleRepository.getAll();
  }
}
