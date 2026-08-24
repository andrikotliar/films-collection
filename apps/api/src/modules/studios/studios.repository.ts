import {
  getSkipValue,
  PAGE_LIMITS,
  type CommonListQueryParams,
  type StudioInput,
} from '@films-collection/shared';
import { studios } from '~/database/schema.js';
import { and, asc, eq, type SQL } from 'drizzle-orm';
import type { Deps } from '~/shared/types/deps.js';
import { mapCommonFilters } from '~/shared/helpers/map-common-filters.js';
import { getCount } from '~/shared/helpers/get-count.js';

export class StudiosRepository {
  constructor(private readonly deps: Deps<'Database'>) {}

  getAll() {
    return this.deps.Database.select({
      id: studios.id,
      title: studios.title,
      updatedAt: studios.updatedAt,
    })
      .from(studios)
      .orderBy(asc(studios.title));
  }

  async getList(queries: CommonListQueryParams) {
    const filters = mapCommonFilters(queries, studios);

    const list = await this.deps.Database.select({
      id: studios.id,
      title: studios.title,
      updatedAt: studios.updatedAt,
    })
      .from(studios)
      .where(and(...filters))
      .orderBy(asc(studios.title))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex));

    const total = await this.count(filters);

    return { list, total };
  }

  async create(input: StudioInput) {
    const [studio] = await this.deps.Database.insert(studios).values(input).returning();

    return studio;
  }

  async delete(id: number) {
    await this.deps.Database.delete(studios).where(eq(studios.id, id));
  }

  async update(id: number, input: StudioInput) {
    const [studio] = await this.deps.Database.update(studios)
      .set(input)
      .where(eq(studios.id, id))
      .returning();

    return studio;
  }

  count(filters?: SQL[]) {
    return getCount(this.deps.Database, studios, filters);
  }
}
