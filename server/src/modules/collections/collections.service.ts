import { buildListOptions } from 'src/common';
import { CollectionsRepository } from './collections.repository';

export class CollectionsService {
  constructor(private collectionsRepository: CollectionsRepository) {}

  async getCollectionById(id: number) {
    return this.collectionsRepository.getCollectionById(id);
  }

  async getListOptions() {
    const collections = await this.collectionsRepository.getAll();

    return buildListOptions(collections);
  }
}
