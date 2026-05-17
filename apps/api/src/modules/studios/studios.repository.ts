import { getCount, mapCommonFilters, type Deps } from '~/shared/index.js';
import {
  getSkipValue,
  PAGE_LIMITS,
  type CommonListQueryParams,
  type StudioInput,
} from '@films-collection/shared';
import { studios } from '~/database/schema.js';
import { and, asc, eq } from 'drizzle-orm';

export class StudiosRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getAll() {
    return this.deps.db
      .select({ id: studios.id, title: studios.title, updatedAt: studios.updatedAt })
      .from(studios)
      .orderBy(asc(studios.title));
  }

  getList(queries: CommonListQueryParams) {
    const filters = mapCommonFilters(queries, studios);

    return this.deps.db
      .select({ id: studios.id, title: studios.title, updatedAt: studios.updatedAt })
      .from(studios)
      .where(and(...filters))
      .orderBy(asc(studios.title))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex));
  }

  async create(input: StudioInput) {
    const [studio] = await this.deps.db.insert(studios).values(input).returning();

    return studio;
  }

  async delete(id: number) {
    await this.deps.db.delete(studios).where(eq(studios.id, id));
  }

  async update(id: number, input: StudioInput) {
    const [studio] = await this.deps.db
      .update(studios)
      .set(input)
      .where(eq(studios.id, id))
      .returning();

    return studio;
  }

  count() {
    return getCount(this.deps.db, studios);
  }
}
