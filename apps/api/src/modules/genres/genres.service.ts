import { buildListOptions, listResponse, throwIfNotFound, type Deps } from '~/shared/index.js';
import { PAGE_LIMITS, type CommonListQueryParams, type GenreInput } from '@films-collection/shared';

export class GenresService {
  constructor(private readonly deps: Deps<'genresRepository'>) {}

  async getListOptions() {
    const sortedGenres = await this.deps.genresRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  async getBaseListData(queries: CommonListQueryParams) {
    const list = await this.deps.genresRepository.getList(queries);
    const total = await this.deps.genresRepository.count();

    return listResponse({ list, total, pageLimit: PAGE_LIMITS.default });
  }

  createGenre(input: GenreInput) {
    return throwIfNotFound(this.deps.genresRepository.create(input));
  }

  deleteGenre(id: number) {
    return this.deps.genresRepository.delete(id);
  }

  updateGenre(id: number, input: GenreInput) {
    return throwIfNotFound(this.deps.genresRepository.update(id, input));
  }
}
