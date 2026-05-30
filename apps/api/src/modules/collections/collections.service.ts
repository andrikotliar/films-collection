import { buildListOptions, listResponse, throwIfNotFound, type Deps } from '~/shared/index.js';

import {
  PAGE_LIMITS,
  type CollectionListQueryParams,
  type CreateCollectionInput,
  type UpdateCollectionInput,
} from '@films-collection/shared';

export class CollectionsService {
  constructor(private readonly deps: Deps<'collectionsRepository' | 'filmsService'>) {}

  async getCollectionById(id: number) {
    return this.deps.collectionsRepository.getCollectionById(id);
  }

  async getListOptions() {
    const collections = await this.deps.collectionsRepository.getCollectionOptions();

    return buildListOptions(collections);
  }

  async getGeneralDataList(queries: CollectionListQueryParams) {
    const { list, total } = await this.deps.collectionsRepository.getList(queries);

    return listResponse({ list, total, pageLimit: PAGE_LIMITS.default });
  }

  getChapterRelatedCollections() {
    return this.deps.collectionsRepository.getChapterRelatedCollections();
  }

  async createCollection(input: CreateCollectionInput) {
    const collection = await throwIfNotFound(this.deps.collectionsRepository.create(input));

    if (input.films.length) {
      await this.deps.filmsService.linkCollectionToFilms(
        input.films.map((film) => ({
          filmId: film.filmId,
          order: film.order,
          collectionId: collection.id,
        })),
      );
    }

    return collection;
  }

  deleteCollection(id: number) {
    return this.deps.collectionsRepository.delete(id);
  }

  async updateCollection(id: number, input: UpdateCollectionInput) {
    const collection = await this.deps.collectionsRepository.update(id, input);

    if (input.films) {
      await this.deps.filmsService.unlinkCollection(id);

      if (input.films.length) {
        await this.deps.filmsService.linkCollectionToFilms(
          input.films.map((film) => ({
            filmId: film.filmId,
            order: film.order,
            collectionId: collection.id,
          })),
        );
      }
    }

    return collection;
  }

  countFilmsByCollection(id: number) {
    return this.deps.collectionsRepository.countFilmsByCollection(id);
  }
}
