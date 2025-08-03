import { PrismaClient, type Collection, type CollectionEvent, type Film } from '@prisma/client';
import {
  CreateCollectionEventPayload,
  UpdateCollectionEventPayload,
} from 'src/modules/collection-events/schemas';

export type CurrentEvent = Omit<CollectionEvent, 'createdAt' | 'updatedAt' | 'collectionId'> & {
  collection: Pick<Collection, 'id' | 'title'>;
  film: Pick<Film, 'poster'>;
  filmsCount: number;
};

export class CollectionEventsRepository {
  constructor(private databaseClient: PrismaClient) {}

  getEventById(id: number) {
    return this.databaseClient.collectionEvent.findUnique({
      where: {
        id,
      },
    });
  }

  getEvents(date: string) {
    return this.databaseClient.$queryRaw<CurrentEvent[]>`
      SELECT
        ce.id,
        ce.title,
        ce.start_date as "startDate",
        ce.end_date as "endDate",
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
      WHERE ${date} BETWEEN ce.start_date AND ce.end_date
    `;
  }

  getAllEvents() {
    return this.databaseClient.collectionEvent.findMany({
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
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
      orderBy: [{ startDate: 'desc' }],
    });
  }

  createEvent(data: CreateCollectionEventPayload) {
    return this.databaseClient.collectionEvent.create({
      data,
    });
  }

  updateEvent(id: number, data: UpdateCollectionEventPayload) {
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
