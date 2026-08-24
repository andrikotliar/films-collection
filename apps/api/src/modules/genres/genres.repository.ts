import {
  getSkipValue,
  PAGE_LIMITS,
  type CommonListQueryParams,
  type GenreInput,
} from '@films-collection/shared';
import { genres } from '~/database/schema.js';
import { and, asc, eq, type SQL } from 'drizzle-orm';
import type { Deps } from '~/shared/types/deps.js';
import { mapCommonFilters } from '~/shared/helpers/map-common-filters.js';
import { getFirstValue } from '~/shared/helpers/get-first-value.js';
import { getCount } from '~/shared/helpers/get-count.js';

export class GenresRepository {
  constructor(private readonly deps: Deps<'Database'>) {}

  getAll() {
    return this.deps.Database.select({
      id: genres.id,
      title: genres.title,
      updatedAt: genres.updatedAt,
    })
      .from(genres)
      .orderBy(asc(genres.title));
  }

  async getList(queries: CommonListQueryParams) {
    const filters = mapCommonFilters(queries, genres);

    const list = await this.deps.Database.select({
      id: genres.id,
      title: genres.title,
      updatedAt: genres.updatedAt,
    })
      .from(genres)
      .where(and(...filters))
      .orderBy(asc(genres.title))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex));

    const total = await this.count(filters);

    return { list, total };
  }

  create(input: GenreInput) {
    return getFirstValue(this.deps.Database.insert(genres).values(input).returning());
  }

  async delete(id: number) {
    await this.deps.Database.delete(genres).where(eq(genres.id, id));
  }

  update(id: number, input: GenreInput) {
    return getFirstValue(
      this.deps.Database.update(genres).set(input).where(eq(genres.id, id)).returning(),
    );
  }

  count(filters?: SQL[]) {
    return getCount(this.deps.Database, genres, filters);
  }
}
