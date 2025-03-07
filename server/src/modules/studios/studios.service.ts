import { buildListOptions } from 'src/common';
import { StudiosRepository } from './studios.repository';

export class StudiosService {
  constructor(private studiosRepository: StudiosRepository) {}

  async getListOptions() {
    const sortedGenres = await this.studiosRepository.getAll();

    return buildListOptions(sortedGenres);
  }
}
