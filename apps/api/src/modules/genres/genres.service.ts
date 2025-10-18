import { buildListOptions } from '~/common';
import { GenresRepository } from './genres.repository';
import { ManageGenreInput } from '~/modules/genres/schemas';

export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async getListOptions() {
    const sortedGenres = await this.genresRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  getBaseListData() {
    return this.genresRepository.getAll();
  }

  createGenre(input: ManageGenreInput) {
    return this.genresRepository.create(input);
  }

  deleteGenre(id: number) {
    return this.genresRepository.delete(id);
  }

  updateGenre(id: number, input: ManageGenreInput) {
    return this.genresRepository.update(id, input);
  }
}
