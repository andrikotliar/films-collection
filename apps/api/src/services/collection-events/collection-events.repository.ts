import { getFirstValue, type Deps } from '~/shared';
import type {
  CreateCollectionEventInput,
  UpdateCollectionEventInput,
} from '@films-collection/shared';
import { collectionEvents, films } from '~/database/schema';
import { and, asc, between, eq, gt, gte, lte, or, sql } from 'drizzle-orm';

export class CollectionEventsRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  async getEventById(id: number) {
    return getFirstValue(
      this.deps.db.select().from(collectionEvents).where(eq(collectionEvents.id, id)),
    );
  }

  getEvents(dateCode: number) {
    return this.deps.db
      .select({
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

  getAllEvents() {
    return this.deps.db.query.collectionEvents.findMany({
      columns: {
        id: true,
        title: true,
        startDateCode: true,
        endDateCode: true,
        yearFrom: true,
      },
      with: {
        film: {
          columns: {
            id: true,
            poster: true,
          },
        },
        collection: {
          columns: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: asc(collectionEvents.startDateCode),
    });
  }

  createEvent(data: CreateCollectionEventInput) {
    return this.deps.db.insert(collectionEvents).values(data);
  }

  updateEvent(id: number, data: UpdateCollectionEventInput) {
    return this.deps.db.update(collectionEvents).set(data).where(eq(collectionEvents.id, id));
  }

  deleteEvent(id: number) {
    return this.deps.db.delete(collectionEvents).where(eq(collectionEvents.id, id));
  }
}
