import {
  CollectionCategory,
  getSkipValue,
  PAGE_LIMITS,
  type CollectionListQueryParams,
  type CreateCollectionInput,
  type UpdateCollectionInput,
} from '@films-collection/shared';
import { and, asc, count, eq, ne, inArray, type SQL } from 'drizzle-orm';
import { collections, filmsCollections } from '~/database/schema.js';
import { getCount } from '~/shared/helpers/get-count.js';
import { getFirstValue } from '~/shared/helpers/get-first-value.js';
import { mapCommonFilters } from '~/shared/helpers/map-common-filters.js';
import type { Deps } from '~/shared/types/dependencies.js';

export class CollectionsRepository {
  constructor(private readonly deps: Deps<'Database'>) {}

  getCollectionById(id: number) {
    return getFirstValue(
      this.deps.Database.select().from(collections).where(eq(collections.id, id)),
    );
  }

  getAll() {
    return this.deps.Database.select({
      id: collections.id,
      title: collections.title,
      category: collections.category,
    })
      .from(collections)
      .orderBy(asc(collections.title));
  }

  getCollectionOptions() {
    return this.deps.Database.select({
      id: collections.id,
      title: collections.title,
      category: collections.category,
    })
      .from(collections)
      .where(ne(collections.category, 'CHAPTER'))
      .orderBy(asc(collections.title));
  }

  async getList(queries: CollectionListQueryParams) {
    const filters = mapCommonFilters(queries, collections);
    const list = await this.deps.Database.select({
      id: collections.id,
      title: collections.title,
      category: collections.category,
    })
      .from(collections)
      .where(and(...filters))
      .orderBy(asc(collections.title))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex));

    const total = await this.count(filters);

    return { list, total };
  }

  getChapterRelatedCollections() {
    return this.deps.Database.select({
      id: collections.id,
      title: collections.title,
      category: collections.category,
      updatedAt: collections.updatedAt,
    })
      .from(collections)
      .where(
        inArray(collections.category, [
          CollectionCategory.CHAPTER,
          CollectionCategory.CINEMATIC_UNIVERSE,
        ]),
      )
      .orderBy(asc(collections.title));
  }

  count(filters?: SQL[]) {
    return getCount(this.deps.Database, collections, filters);
  }

  create(input: CreateCollectionInput) {
    return getFirstValue(this.deps.Database.insert(collections).values(input).returning());
  }

  async delete(id: number) {
    await this.deps.Database.delete(collections).where(eq(collections.id, id));
  }

  async update(id: number, input: UpdateCollectionInput) {
    const [collection] = await this.deps.Database.update(collections)
      .set(input)
      .where(eq(collections.id, id))
      .returning();

    return collection;
  }

  async countFilmsByCollection(collectionId: number) {
    const [result] = await this.deps.Database.select({
      count: count(),
    })
      .from(filmsCollections)
      .where(eq(filmsCollections.collectionId, collectionId));

    return result.count;
  }
}
