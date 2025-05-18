import {
  CreatePersonInput,
  SearchPersonQuery,
  UpdatePersonInput,
} from './schemas';
import { PeopleRepository } from './people.repository';
import { FilesService } from 'src/modules/files/files.service';
import { NotFoundException } from 'src/common';

export class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly filesService: FilesService,
  ) {}

  getPersonById(personId: number) {
    return this.peopleRepository.findPersonById(personId);
  }

  searchPersonByTitle(queries: SearchPersonQuery) {
    return this.peopleRepository.searchPersonByName(queries);
  }

  createPerson(input: CreatePersonInput) {
    console.log(input);
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
