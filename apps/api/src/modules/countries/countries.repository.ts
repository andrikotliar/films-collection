import { getCount, getFirstValue, mapCommonFilters, type Deps } from '~/shared/index.js';
import {
  getSkipValue,
  PAGE_LIMITS,
  type CommonListQueryParams,
  type CountryInput,
} from '@films-collection/shared';
import { countries } from '~/database/schema.js';
import { and, asc, eq, type SQL } from 'drizzle-orm';

export class CountriesRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getAll() {
    return this.deps.db
      .select({ id: countries.id, title: countries.title, updatedAt: countries.updatedAt })
      .from(countries)
      .orderBy(asc(countries.title));
  }

  async getList(queries: CommonListQueryParams) {
    const filters = mapCommonFilters(queries, countries);

    const list = await this.deps.db
      .select({ id: countries.id, title: countries.title, updatedAt: countries.updatedAt })
      .from(countries)
      .where(and(...filters))
      .orderBy(asc(countries.title))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex));

    const total = await this.count(filters);

    return { list, total };
  }

  create(input: CountryInput) {
    return getFirstValue(this.deps.db.insert(countries).values(input).returning());
  }

  async delete(id: number) {
    await this.deps.db.delete(countries).where(eq(countries.id, id));
  }

  update(id: number, input: CountryInput) {
    return getFirstValue(
      this.deps.db.update(countries).set(input).where(eq(countries.id, id)).returning(),
    );
  }

  count(filters?: SQL[]) {
    return getCount(this.deps.db, countries, filters);
  }
}
