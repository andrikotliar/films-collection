import { getCount, getFirstValue, type Deps } from '~/shared';
import { type CountryInput } from '@films-collection/shared';
import { countries } from '~/database/schema';
import { asc, eq } from 'drizzle-orm';

export class CountriesRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getAll(limit?: number) {
    const query = this.deps.db
      .select({ id: countries.id, title: countries.title, updatedAt: countries.updatedAt })
      .from(countries)
      .orderBy(asc(countries.title));

    if (limit) {
      query.limit(limit);
    }

    return query;
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

  count() {
    return getCount(this.deps.db, countries);
  }
}
