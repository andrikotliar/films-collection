import { getFirstValue, type Deps } from '~/shared';
import type { CountryInput } from '@films-collection/shared';
import { countries } from '~/database/schema';
import { asc, eq } from 'drizzle-orm';

export class CountriesRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getAll() {
    return this.deps.db
      .select({ id: countries.id, title: countries.title })
      .from(countries)
      .orderBy(asc(countries.title));
  }

  async create(input: CountryInput) {
    return getFirstValue(await this.deps.db.insert(countries).values(input).returning());
  }

  async delete(id: number) {
    await this.deps.db.delete(countries).where(eq(countries.id, id));
  }

  async update(id: number, input: CountryInput) {
    return getFirstValue(
      await this.deps.db.update(countries).set(input).where(eq(countries.id, id)).returning(),
    );
  }
}
