import { buildListOptions } from 'src/common';
import { CollectionsRepository } from './collections.repository';
import { CreateCollectionInput } from 'src/modules/collections/schemas';
import { UpdateCollectionInput } from 'src/modules/collections/schemas/update-collection.schema';

export class CollectionsService {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}

  async getCollectionById(id: number) {
    return this.collectionsRepository.getCollectionById(id);
  }

  async getListOptions() {
    const collections = await this.collectionsRepository.getAll();

    return buildListOptions(collections);
  }

  createCollection(input: CreateCollectionInput) {
    return this.collectionsRepository.create(input);
  }

  deleteCollection(id: number) {
    return this.collectionsRepository.delete(id);
  }

  updateCollection(id: number, input: UpdateCollectionInput) {
    return this.collectionsRepository.update(id, input);
  }
}
