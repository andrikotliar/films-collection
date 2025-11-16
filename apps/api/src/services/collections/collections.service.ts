import { buildListOptions, type Deps } from '~/shared';
import { CollectionsRepository } from './collections.repository';
import { CreateCollectionInput, UpdateCollectionInput } from './schemas';

export class CollectionsService {
  private readonly collectionsRepository: CollectionsRepository;

  constructor(deps: Deps<'collectionsRepository'>) {
    this.collectionsRepository = deps.collectionsRepository;
  }

  async getCollectionById(id: number) {
    return this.collectionsRepository.getCollectionById(id);
  }

  async getListOptions() {
    const collections = await this.collectionsRepository.getAll();

    return buildListOptions(collections);
  }

  async getGeneralDataList() {
    return this.collectionsRepository.getAll();
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

  countFilmsByCollection(id: number) {
    return this.collectionsRepository.countFilmsByCollection(id);
  }
}
