import type { CreateCollectionInput, UpdateCollectionInput } from '@films-collection/shared';
import { asc, count, eq } from 'drizzle-orm';
import { collections, filmsCollections } from '~/database/schema';
import { getFirstValue, type Deps } from '~/shared';

export class CollectionsRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  async getCollectionById(id: number) {
    return getFirstValue(
      await this.deps.db.select().from(collections).where(eq(collections.id, id)),
    );
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

  async create(input: CreateCollectionInput) {
    return getFirstValue(await this.deps.db.insert(collections).values(input).returning());
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
