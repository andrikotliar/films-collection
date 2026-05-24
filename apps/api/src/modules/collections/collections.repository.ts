import {
  getSkipValue,
  PAGE_LIMITS,
  type CommonListQueryParams,
  type CreateCollectionInput,
  type UpdateCollectionInput,
} from '@films-collection/shared';
import { and, asc, count, eq, ne, type SQL } from 'drizzle-orm';
import { collections, filmsCollections } from '~/database/schema.js';
import { getCount, getFirstValue, mapCommonFilters, type Deps } from '~/shared/index.js';

export class CollectionsRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getCollectionById(id: number) {
    return getFirstValue(this.deps.db.select().from(collections).where(eq(collections.id, id)));
  }

  getAll() {
    return this.deps.db
      .select({
        id: collections.id,
        title: collections.title,
        category: collections.category,
      })
      .from(collections)
      .orderBy(asc(collections.title));
  }

  getCollectionOptions() {
    return this.deps.db
      .select({
        id: collections.id,
        title: collections.title,
        category: collections.category,
      })
      .from(collections)
      .where(ne(collections.category, 'CHAPTER'))
      .orderBy(asc(collections.title));
  }

  async getList(queries: CommonListQueryParams) {
    const filters = mapCommonFilters(queries, collections);
    const list = await this.deps.db
      .select({
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

  count(filters?: SQL[]) {
    return getCount(this.deps.db, collections, filters);
  }

  create(input: CreateCollectionInput) {
    return getFirstValue(this.deps.db.insert(collections).values(input).returning());
  }

  async delete(id: number) {
    await this.deps.db.delete(collections).where(eq(collections.id, id));
  }

  async update(id: number, input: UpdateCollectionInput) {
    const [collection] = await this.deps.db
      .update(collections)
      .set(input)
      .where(eq(collections.id, id))
      .returning();

    return collection;
  }

  async countFilmsByCollection(collectionId: number) {
    const [result] = await this.deps.db
      .select({
        count: count(),
      })
      .from(filmsCollections)
      .where(eq(filmsCollections.collectionId, collectionId));

    return result.count;
  }
}
