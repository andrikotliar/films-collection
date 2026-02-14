import { buildListOptions, type Deps } from '~/shared';

import type { CreateCollectionInput, UpdateCollectionInput } from '@films-collection/shared';

export class CollectionsService {
  constructor(private readonly deps: Deps<'collectionsRepository'>) {}

  async getCollectionById(id: number) {
    return this.deps.collectionsRepository.getCollectionById(id);
  }

  async getListOptions() {
    const collections = await this.deps.collectionsRepository.getAll();

    return buildListOptions(collections);
  }

  async getGeneralDataList() {
    return this.deps.collectionsRepository.getAll();
  }

  createCollection(input: CreateCollectionInput) {
    return this.deps.collectionsRepository.create(input);
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
