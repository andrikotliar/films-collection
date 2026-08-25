import {
  PAGE_LIMITS,
  type CommonListQueryParams,
  type GenreInput,
  type GenresListResponse,
} from '@films-collection/shared';
import { buildListOptions } from '~/shared/helpers/build-list-options.js';
import { throwIfNotFound } from '~/shared/helpers/throw-if-not-found.js';
import type { Deps } from '~/shared/types/deps.js';

export class GenresService {
  constructor(private readonly deps: Deps<'genresRepository'>) {}

  async getListOptions() {
    const sortedGenres = await this.deps.genresRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  async getBaseListData(queries: CommonListQueryParams): Promise<GenresListResponse> {
    const { list, total } = await this.deps.genresRepository.getList(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
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
