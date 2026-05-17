import { buildListOptions, listResponse, throwIfNotFound, type Deps } from '~/shared/index.js';

import {
  PAGE_LIMITS,
  type CommonListQueryParams,
  type CreateCollectionInput,
  type UpdateCollectionInput,
} from '@films-collection/shared';

export class CollectionsService {
  constructor(private readonly deps: Deps<'collectionsRepository'>) {}

  async getCollectionById(id: number) {
    return this.deps.collectionsRepository.getCollectionById(id);
  }

  async getListOptions() {
    const collections = await this.deps.collectionsRepository.getAll();

    return buildListOptions(collections);
  }

  async getGeneralDataList(queries: CommonListQueryParams) {
    const { list, total } = await this.deps.collectionsRepository.getList(queries);

    return listResponse({ list, total, pageLimit: PAGE_LIMITS.default });
  }

  createCollection(input: CreateCollectionInput) {
    return throwIfNotFound(this.deps.collectionsRepository.create(input));
  }

  deleteCollection(id: number) {
    return this.deps.collectionsRepository.delete(id);
  }

  updateCollection(id: number, input: UpdateCollectionInput) {
    return this.deps.collectionsRepository.update(id, input);
  }

  countFilmsByCollection(id: number) {
    return this.deps.collectionsRepository.countFilmsByCollection(id);
  }
}
