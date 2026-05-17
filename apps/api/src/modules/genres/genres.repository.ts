import { getCount, getFirstValue, mapCommonFilters, type Deps } from '~/shared/index.js';
import {
  getSkipValue,
  PAGE_LIMITS,
  type CommonListQueryParams,
  type GenreInput,
} from '@films-collection/shared';
import { genres } from '~/database/schema.js';
import { and, asc, eq } from 'drizzle-orm';

export class GenresRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getAll() {
    return this.deps.db
      .select({
        id: genres.id,
        title: genres.title,
        updatedAt: genres.updatedAt,
      })
      .from(genres)
      .orderBy(asc(genres.title));
  }

  getList(queries: CommonListQueryParams) {
    const filters = mapCommonFilters(queries, genres);

    return this.deps.db
      .select({
        id: genres.id,
        title: genres.title,
        updatedAt: genres.updatedAt,
      })
      .from(genres)
      .where(and(...filters))
      .orderBy(asc(genres.title))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex));
  }

  create(input: GenreInput) {
    return getFirstValue(this.deps.db.insert(genres).values(input).returning());
  }

  async delete(id: number) {
    await this.deps.db.delete(genres).where(eq(genres.id, id));
  }

  update(id: number, input: GenreInput) {
    return getFirstValue(
      this.deps.db.update(genres).set(input).where(eq(genres.id, id)).returning(),
    );
  }

  count() {
    return getCount(this.deps.db, genres);
  }
}
