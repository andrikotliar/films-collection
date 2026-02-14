import { buildListOptions, type Deps } from '~/shared';
import type { GenreInput } from '@films-collection/shared';

export class GenresService {
  constructor(private readonly deps: Deps<'genresRepository'>) {}

  async getListOptions() {
    const sortedGenres = await this.deps.genresRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  getBaseListData() {
    return this.deps.genresRepository.getAll();
  }

  createGenre(input: GenreInput) {
    return this.deps.genresRepository.create(input);
  }

  deleteGenre(id: number) {
    return this.deps.genresRepository.delete(id);
  }

  updateGenre(id: number, input: GenreInput) {
    return this.deps.genresRepository.update(id, input);
  }
}
