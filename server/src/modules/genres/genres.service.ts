import { buildListOptions } from 'src/common';
import { GenresRepository } from './genres.repository';

export class GenresService {
  constructor(private genresRepository: GenresRepository) {}

  async getListOptions() {
    const sortedGenres = await this.genresRepository.getAll();

    return buildListOptions(sortedGenres);
  }
}
