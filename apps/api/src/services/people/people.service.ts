import { NotFoundException, type Deps } from '~/shared';
import type { Prisma } from '@prisma/client';
import {
  getSkipValue,
  PAGE_LIMITS,
  type CreatePersonInput,
  type GetPeopleListQuery,
  type ListOption,
  type SearchPersonQuery,
  type UpdatePersonInput,
} from '@films-collection/shared';

export class PeopleService {
  constructor(private readonly deps: Deps<'peopleRepository'>) {}

  async getList(queries: GetPeopleListQuery) {
    const filters: Prisma.PersonWhereInput = {};
    const options: Prisma.PersonFindManyArgs = {
      where: filters,
      take: PAGE_LIMITS.default,
      skip: getSkipValue('default', queries.pageIndex),
    };

    if (queries.q) {
      filters.name = {
        contains: queries.q,
        mode: 'insensitive',
      };
    }

    if (queries.role) {
      filters.films = {
        some: {
          role: queries.role,
        },
      };
    }

    if (queries.selected) {
      filters.selected = true;
    }

    const list = await this.deps.peopleRepository.getList(options);
    const total = await this.deps.peopleRepository.count(filters);

    return { list, total };
  }

  getPersonById(personId: number) {
    return this.deps.peopleRepository.findPersonById(personId);
  }

  async searchPerson(queries: SearchPersonQuery) {
    const data = await this.deps.peopleRepository.searchPerson(queries);

    return data.map((person) => ({
      label: person.name,
      value: person.id,
    }));
  }

  createPerson(input: CreatePersonInput) {
    return this.deps.peopleRepository.createPerson(input);
  }

  async updatePerson(id: number, input: UpdatePersonInput) {
    const person = await this.deps.peopleRepository.findPersonById(id);

    if (!person) {
      throw new NotFoundException({ message: `Person #${id} not found!` });
    }

    return this.deps.peopleRepository.update(id, input);
  }

  async deletePerson(id: number) {
    return this.deps.peopleRepository.delete(id);
  }

  async getSelectedListOptions(): Promise<ListOption<number>[]> {
    const people = await this.deps.peopleRepository.getSelected();

    return people.map((person) => ({
      value: person.id,
      label: person.name,
    }));
  }
}
