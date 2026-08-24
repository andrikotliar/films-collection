import {
  PAGE_LIMITS,
  type CollectionListQueryParams,
  type CollectionsListResponse,
  type CreateCollectionInput,
  type UpdateCollectionInput,
} from '@films-collection/shared';
import { buildListOptions } from '~/shared/helpers/build-list-options.js';
import { throwIfNotFound } from '~/shared/helpers/throw-if-not-found.js';
import type { Deps } from '~/shared/types/deps.js';

export class CollectionsService {
  constructor(private readonly deps: Deps<'CollectionsRepository' | 'FilmsService'>) {}

  async getCollectionById(id: number) {
    return this.deps.CollectionsRepository.getCollectionById(id);
  }

  async getListOptions() {
    const collections = await this.deps.CollectionsRepository.getCollectionOptions();

    return buildListOptions(collections);
  }

  async getAllCollections() {
    const collections = await this.deps.CollectionsRepository.getAll();

    return buildListOptions(collections);
  }

  async getGeneralDataList(queries: CollectionListQueryParams): Promise<CollectionsListResponse> {
    const { list, total } = await this.deps.CollectionsRepository.getList(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
  }

  getChapterRelatedCollections() {
    return this.deps.CollectionsRepository.getChapterRelatedCollections();
  }

  async createCollection(input: CreateCollectionInput) {
    const collection = await throwIfNotFound(this.deps.CollectionsRepository.create(input));

    if (input.films.length) {
      await this.deps.FilmsService.linkCollectionToFilms(
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
    return this.deps.CollectionsRepository.delete(id);
  }

  async updateCollection(id: number, input: UpdateCollectionInput) {
    const collection = await this.deps.CollectionsRepository.update(id, input);

    if (input.films) {
      await this.deps.FilmsService.unlinkCollection(id);

      if (input.films.length) {
        await this.deps.FilmsService.linkCollectionToFilms(
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
    return this.deps.CollectionsRepository.countFilmsByCollection(id);
  }
}
