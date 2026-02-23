import {
  getSkipValue,
  PAGE_LIMITS,
  type CreatePendingFilmInput,
  type GetPendingFilmsListQuery,
  type SortingOrder,
  type UpdatePendingFilmInput,
} from '@films-collection/shared';
import { and, asc, count, desc, eq, ilike, inArray, type AnyColumn, type SQL } from 'drizzle-orm';
import { pendingFilms } from '~/database/schema';
import { getFirstValue, type Deps } from '~/shared';

export class PendingFilmsRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  async getListAndCount(queries: GetPendingFilmsListQuery) {
    const filters = this.getListFilters(queries);
    const andFilter = and(...filters);
    const sorting = this.getOrderParams(queries.orderKey, queries.order);

    const list = await this.deps.db
      .select()
      .from(pendingFilms)
      .where(andFilter)
      .orderBy(sorting)
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex));

    const countResult = await this.deps.db
      .select({ count: count() })
      .from(pendingFilms)
      .where(andFilter);

    return { list, total: countResult[0].count };
  }

  create(data: CreatePendingFilmInput) {
    return getFirstValue(this.deps.db.insert(pendingFilms).values(data).returning());
  }

  async deleteById(id: number) {
    await this.deps.db.delete(pendingFilms).where(eq(pendingFilms.id, id));
  }

  updateById(id: number, data: UpdatePendingFilmInput) {
    return getFirstValue(
      this.deps.db.update(pendingFilms).set(data).where(eq(pendingFilms.id, id)).returning(),
    );
  }

  findPendingFilm(id: number) {
    return getFirstValue(
      this.deps.db
        .select({
          id: pendingFilms.id,
          collectionId: pendingFilms.collectionId,
          title: pendingFilms.title,
          rating: pendingFilms.rating,
          priority: pendingFilms.priority,
        })
        .from(pendingFilms)
        .where(eq(pendingFilms.id, id)),
    );
  }

  private getOrderParams(key: string = 'createdAt', direction: SortingOrder = 'desc') {
    const orderingFunction: Record<SortingOrder, (column: AnyColumn) => SQL> = {
      asc,
      desc,
    };

    const fn = orderingFunction[direction];

    switch (key) {
      case 'title':
        return fn(pendingFilms.title);
      case 'createdAt':
        return fn(pendingFilms.createdAt);
      case 'priority':
        return fn(pendingFilms.priority);
      default:
        return desc(pendingFilms.createdAt);
    }
  }

  private getListFilters({ q, priorities }: GetPendingFilmsListQuery) {
    const filters: SQL[] = [];

    if (q) {
      filters.push(ilike(pendingFilms.title, q.trim()));
    }

    if (priorities?.length) {
      filters.push(inArray(pendingFilms.priority, priorities));
    }

    return filters;
  }
}
