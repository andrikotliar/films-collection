import { buildListOptions, type Deps } from '~/shared';
import { GenresRepository } from './genres.repository';
import { ManageGenreInput } from '~/services/genres/schemas';

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
