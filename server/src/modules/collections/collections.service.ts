import { buildListOptions, convertEnumValuesToOption } from 'src/common';
import { CollectionsRepository } from './collections.repository';
import { CreateCollectionInput, UpdateCollectionInput } from './schemas';
import { CollectionCategory } from '@prisma/client';

export class CollectionsService {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}

  async getCollectionById(id: number) {
    return this.collectionsRepository.getCollectionById(id);
  }

  async getListOptions() {
    const collections = await this.collectionsRepository.getAll();

    return buildListOptions(collections);
  }

  async getGeneralDataList() {
    const list = await this.collectionsRepository.getAll();
    const categories = convertEnumValuesToOption(CollectionCategory);

    return {
      list,
      categories,
    };
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
