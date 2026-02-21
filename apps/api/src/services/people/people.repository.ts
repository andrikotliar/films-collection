import {
  getSkipValue,
  PAGE_LIMITS,
  type CreatePersonInput,
  type GetPeopleListQuery,
  type SearchPersonQuery,
  type UpdatePersonInput,
} from '@films-collection/shared';
import { and, asc, count, eq, exists, ilike, inArray, notInArray, type SQL } from 'drizzle-orm';
import { filmsPeople, people } from '~/database/schema';
import { getFirstValue, type Deps } from '~/shared';

export class PeopleRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  async findPersonById(personId: number) {
    return getFirstValue(this.deps.db.select().from(people).where(eq(people.id, personId)));
  }

  getList(queries: GetPeopleListQuery) {
    const filters = this.getListFilters(queries);

    const baseQuery = this.deps.db
      .select({
        id: people.id,
        name: people.name,
        selected: people.selected,
      })
      .from(people)
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex))
      .orderBy(asc(people.name));

    if (filters.length) {
      return baseQuery.where(and(...filters));
    }

    return baseQuery;
  }

  async count(queries?: GetPeopleListQuery) {
    const filters = this.getListFilters(queries);

    const baseQuery = this.deps.db
      .select({
        count: count(),
      })
      .from(people);

    if (filters.length) {
      const result = await baseQuery.where(and(...filters));

      return result[0].count;
    }

    const result = await baseQuery;

    return result[0].count;
  }

  async createPerson(input: CreatePersonInput) {
    return getFirstValue(this.deps.db.insert(people).values(input).returning());
  }

  async searchPerson({ q, selected }: SearchPersonQuery) {
    const filters: SQL[] = [];

    if (selected) {
      filters.push(notInArray(people.id, selected));
    }

    if (q) {
      filters.push(ilike(people.name, q.trim()));
    } else {
      filters.push(eq(people.selected, true));
    }

    const queryResult = await this.deps.db
      .select({
        id: people.id,
        name: people.name,
      })
      .from(people)
      .where(and(...filters))
      .limit(PAGE_LIMITS.default)
      .orderBy(asc(people.name), asc(people.id));

    if (selected) {
      const selectedPeople = await this.deps.db
        .select({
          id: people.id,
          name: people.name,
        })
        .from(people)
        .where(inArray(people.id, selected))
        .orderBy(asc(people.name), asc(people.id));

      return [...queryResult, ...selectedPeople];
    }

    return queryResult;
  }

  async update(id: number, input: UpdatePersonInput) {
    return getFirstValue(
      this.deps.db.update(people).set(input).where(eq(people.id, id)).returning(),
    );
  }

  async delete(id: number) {
    await this.deps.db.delete(people).where(eq(people.id, id));
  }

  getSelected() {
    return this.deps.db
      .select({ id: people.id, name: people.name })
      .from(people)
      .where(eq(people.selected, true))
      .orderBy(asc(people.name));
  }

  private getListFilters(queries?: GetPeopleListQuery): SQL[] {
    if (!queries) {
      return [];
    }

    const filters: SQL[] = [];

    if (queries.q) {
      filters.push(ilike(people.name, queries.q));
    }

    if (queries.selected) {
      filters.push(eq(people.selected, true));
    }

    if (queries.role) {
      const subquery = this.deps.db
        .select()
        .from(filmsPeople)
        .where(and(eq(filmsPeople.personId, people.id), eq(filmsPeople.role, queries.role)));

      filters.push(exists(subquery));
    }

    return filters;
  }
}
