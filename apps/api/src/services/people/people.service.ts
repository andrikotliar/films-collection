import type { PeopleRepository } from './people.repository';
import { NotFoundException, type Deps } from '~/shared';
import type { Prisma } from '@prisma/client';
import {
  PAGE_LIMITS,
  type CreatePersonInput,
  type GetPeopleListQuery,
  type SearchPersonQuery,
  type UpdatePersonInput,
} from '@films-collection/shared';

export class PeopleService {
  private readonly peopleRepository: PeopleRepository;

  constructor(deps: Deps<'peopleRepository'>) {
    this.peopleRepository = deps.peopleRepository;
  }

  async getList(queries: GetPeopleListQuery) {
    const filters: Prisma.PersonWhereInput = {};
    const options: Prisma.PersonFindManyArgs = {
      where: filters,
      take: PAGE_LIMITS.default,
      skip: queries.skip,
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

    const list = await this.peopleRepository.getList(options);
    const total = await this.peopleRepository.count(filters);

    return { list, total };
  }

  getPersonById(personId: number) {
    return this.peopleRepository.findPersonById(personId);
  }

  async searchPerson(queries: SearchPersonQuery) {
    const data = await this.peopleRepository.searchPerson(queries);

    return data.map((person) => ({
      label: person.name,
      value: person.id,
    }));
  }

  createPerson(input: CreatePersonInput) {
    return this.peopleRepository.createPerson(input);
  }

  async updatePerson(id: number, input: UpdatePersonInput) {
    const person = await this.peopleRepository.findPersonById(id);

    if (!person) {
      throw new NotFoundException({ message: `Person #${id} not found!` });
    }

    return this.peopleRepository.update(id, input);
  }

  async deletePerson(id: number) {
    return this.peopleRepository.delete(id);
  }
}
