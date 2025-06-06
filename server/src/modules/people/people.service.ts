import {
  CreatePersonInput,
  GetListQueries,
  SearchPersonQuery,
  UpdatePersonInput,
} from './schemas';
import { PeopleRepository } from './people.repository';
import { FilesService } from 'src/modules/files/files.service';
import { NotFoundException } from 'src/common';
import { Prisma } from '@prisma/client';

export class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly filesService: FilesService,
  ) {}

  async getList(queries: GetListQueries) {
    const filters: Prisma.PersonWhereInput = {};
    const options: Prisma.PersonFindManyArgs = {
      where: filters,
      take: 30,
      skip: queries.skip,
    };

    if (queries.q) {
      filters.name = {
        contains: queries.q,
        mode: 'insensitive',
      };
    }

    const list = await this.peopleRepository.getList(options);
    const total = await this.peopleRepository.count(filters);

    return { list, total };
  }

  getPersonById(personId: number) {
    return this.peopleRepository.findPersonById(personId);
  }

  searchPersonByTitle(queries: SearchPersonQuery) {
    return this.peopleRepository.searchPersonByName(queries);
  }

  createPerson(input: CreatePersonInput) {
    return this.peopleRepository.createPerson(input);
  }

  async updatePerson(id: number, input: UpdatePersonInput) {
    const person = await this.peopleRepository.findPersonById(id);

    if (!person) {
      throw new NotFoundException({ message: `Person #${id} not found!` });
    }

    if (person.image && input.image !== person.image) {
      await this.filesService.delete(person.image);
    }

    return this.peopleRepository.update(id, input);
  }

  async deletePerson(id: number) {
    const person = await this.peopleRepository.findPersonById(id);

    if (person?.image) {
      await this.filesService.delete(person.image);
    }

    return this.peopleRepository.delete(id);
  }
}
