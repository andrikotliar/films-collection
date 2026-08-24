import {
  getSkipValue,
  PAGE_LIMITS,
  type CommonListQueryParams,
  type CreateCollectionEventInput,
  type UpdateCollectionEventInput,
} from '@films-collection/shared';
import { collectionEvents, films } from '~/database/schema.js';
import { and, asc, between, eq, gt, gte, lte, or, sql, type SQL } from 'drizzle-orm';
import type { Deps } from '~/shared/types/dependencies.js';
import { getFirstValue } from '~/shared/helpers/get-first-value.js';
import { mapCommonFilters } from '~/shared/helpers/map-common-filters.js';
import { getCount } from '~/shared/helpers/get-count.js';

export class CollectionEventsRepository {
  constructor(private readonly deps: Deps<'Database'>) {}

  async getEventById(id: number) {
    return getFirstValue(
      this.deps.Database.select().from(collectionEvents).where(eq(collectionEvents.id, id)),
    );
  }

  getEvents(dateCode: number) {
    return this.deps.Database.select({
      id: collectionEvents.id,
      title: collectionEvents.title,
      yearFrom: collectionEvents.yearFrom,
      collectionId: collectionEvents.collectionId,
      poster: films.poster,
    })
      .from(collectionEvents)
      .innerJoin(films, eq(films.id, collectionEvents.titleFilmId))
      .where(
        or(
          eq(collectionEvents.startDateCode, dateCode),
          and(
            lte(collectionEvents.startDateCode, collectionEvents.endDateCode),
            between(sql`${dateCode}`, collectionEvents.startDateCode, collectionEvents.endDateCode),
          ),
          and(
            gt(collectionEvents.startDateCode, collectionEvents.endDateCode),
            or(
              gte(sql`${dateCode}`, collectionEvents.startDateCode),
              lte(sql`${dateCode}`, collectionEvents.endDateCode),
            ),
          ),
        ),
      );
  }

  async getList(queries: CommonListQueryParams) {
    const filters = mapCommonFilters(queries, collectionEvents);
    const list = await this.deps.Database.select({
      id: collectionEvents.id,
      title: collectionEvents.title,
      yearFrom: collectionEvents.yearFrom,
      startDateCode: collectionEvents.startDateCode,
      endDateCode: collectionEvents.endDateCode,
      titleFilmId: collectionEvents.titleFilmId,
      collectionId: collectionEvents.collectionId,
    })
      .from(collectionEvents)
      .where(and(...filters))
      .orderBy(asc(collectionEvents.startDateCode))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex));

    const total = await this.count(filters);

    return { list, total };
  }

  count(filters?: SQL[]) {
    return getCount(this.deps.Database, collectionEvents, filters);
  }

  createEvent(data: CreateCollectionEventInput) {
    return this.deps.Database.insert(collectionEvents).values(data);
  }

  updateEvent(id: number, data: UpdateCollectionEventInput) {
    return this.deps.Database.update(collectionEvents).set(data).where(eq(collectionEvents.id, id));
  }

  deleteEvent(id: number) {
    return this.deps.Database.delete(collectionEvents).where(eq(collectionEvents.id, id));
  }
}
