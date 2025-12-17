import { type Collection, type CollectionEvent, type Film } from '@prisma/client';
import type { DatabaseClient, Deps } from '~/shared';
import type {
  CreateCollectionEventInput,
  UpdateCollectionEventInput,
} from '@films-collection/shared';

export type CurrentEvent = Omit<CollectionEvent, 'createdAt' | 'updatedAt' | 'collectionId'> & {
  collection: Pick<Collection, 'id' | 'title'>;
  film: Pick<Film, 'poster'>;
  filmsCount: number;
};

export class CollectionEventsRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

  getEventById(id: number) {
    return this.databaseClient.collectionEvent.findUnique({
      where: {
        id,
      },
    });
  }

  getEvents(dateCode: number) {
    return this.databaseClient.$queryRaw<CurrentEvent[]>`
      SELECT
        ce.id,
        ce.title,
        ce.start_date_code as "startDateCode",
        ce.end_date_code as "endDateCode",
        ce.year_from as "yearFrom",
        json_build_object(
          'id', c.id,
          'title', c.title
        ) as "collection",
        json_build_object(
          'id', f.id,
          'poster', f.poster
        ) as "film",
        (
          SELECT COUNT(*)::int FROM films_collections fc
          WHERE fc.collection_id = ce.collection_id
        ) as "filmsCount"
      FROM collection_events ce
      INNER JOIN collections c ON ce.collection_id = c.id
      INNER JOIN films f ON ce.title_film_id = f.id
      WHERE
        ce.start_date_code = ${dateCode}
        OR (
          ce.start_date_code <= ce.end_date_code
          AND ${dateCode} BETWEEN ce.start_date_code AND ce.end_date_code
        )
        OR (
          ce.start_date_code > ce.end_date_code
          AND (${dateCode} >= ce.start_date_code OR ${dateCode} <= ce.end_date_code)
        )
    `;
  }

  getAllEvents() {
    return this.databaseClient.collectionEvent.findMany({
      select: {
        id: true,
        title: true,
        startDateCode: true,
        endDateCode: true,
        yearFrom: true,
        film: {
          select: {
            id: true,
            poster: true,
          },
        },
        collection: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [{ startDateCode: 'asc' }],
    });
  }

  createEvent(data: CreateCollectionEventInput) {
    return this.databaseClient.collectionEvent.create({
      data,
    });
  }

  updateEvent(id: number, data: UpdateCollectionEventInput) {
    return this.databaseClient.collectionEvent.update({
      data,
      where: {
        id,
      },
    });
  }

  deleteEvent(id: number) {
    return this.databaseClient.collectionEvent.delete({
      where: {
        id,
      },
    });
  }
}
