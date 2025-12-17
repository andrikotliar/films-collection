import { buildListOptions, type Deps } from '~/shared';
import type { GenresRepository } from './genres.repository';
import type { GenreInput } from '@films-collection/shared';

export class GenresService {
  private readonly genresRepository: GenresRepository;

  constructor(deps: Deps<'genresRepository'>) {
    this.genresRepository = deps.genresRepository;
  }

  async getListOptions() {
    const sortedGenres = await this.genresRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  getBaseListData() {
    return this.genresRepository.getAll();
  }

  createGenre(input: GenreInput) {
    return this.genresRepository.create(input);
  }

  deleteGenre(id: number) {
    return this.genresRepository.delete(id);
  }

  updateGenre(id: number, input: GenreInput) {
    return this.genresRepository.update(id, input);
  }
}
