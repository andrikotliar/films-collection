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
import type { Deps } from '~/shared/types/dependencies.js';

export class PeopleService {
  constructor(private readonly deps: Deps<'PeopleRepository'>) {}

  async getList(queries: GetPeopleListQuery): Promise<PeopleListResponse> {
    const list = await this.deps.PeopleRepository.getList(queries);
    const total = await this.deps.PeopleRepository.count(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
  }

  getPersonById(personId: number) {
    return throwIfNotFound(this.deps.PeopleRepository.findPersonById(personId));
  }

  async searchPerson(queries: SearchPersonQuery) {
    const data = await this.deps.PeopleRepository.searchPerson(queries);

    return data.map((person) => ({
      label: person.name,
      value: person.id,
    }));
  }

  createPerson(input: CreatePersonInput) {
    return throwIfNotFound(this.deps.PeopleRepository.createPerson(input));
  }

  async updatePerson(id: number, input: UpdatePersonInput) {
    await throwIfNotFound(this.deps.PeopleRepository.findPersonById(id));
    return throwIfNotFound(this.deps.PeopleRepository.update(id, input));
  }

  async deletePerson(id: number) {
    await this.deps.PeopleRepository.delete(id);
  }

  async getSelectedListOptions(): Promise<ListOption<number>[]> {
    const people = await this.deps.PeopleRepository.getSelected();

    return people.map((person) => ({
      value: person.id,
      label: person.name,
    }));
  }

  getAll() {
    return this.deps.PeopleRepository.getAll();
  }
}
