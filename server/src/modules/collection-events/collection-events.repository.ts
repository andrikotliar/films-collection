import { CollectionEvent, PrismaClient } from '@prisma/client';
import { GetEventQueryResult } from './types';

export class CollectionEventsRepository {
  constructor(private databaseClient: PrismaClient) {}

  getEventById(id: number) {
    return this.databaseClient.collectionEvent.findUnique({
      where: {
        id,
      },
    });
  }

  getEvent(date: number) {
    return this.databaseClient.$queryRaw<GetEventQueryResult[]>`
      SELECT ce.title, ce.image, c.id as "collectionId" FROM collection_events ce
      INNER JOIN collections c ON c.id = ce.collection_id
      WHERE
        ce.start_date_code = ${date}
        OR (
          ce.start_date_code <= ce.end_date_code
          AND ${date} BETWEEN ce.start_date_code AND ce.end_date_code
        )
        OR (
          ce.start_date_code > ce.end_date_code
          AND (${date} >= ce.start_date_code OR ${date} <= ce.end_date_code)
        );
    `;
  }

  getAllEvents() {
    return this.databaseClient.collectionEvent.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        startDateCode: true,
        endDateCode: true,
        collection: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        startDateCode: 'desc',
      },
    });
  }

  createEvent(data: Omit<CollectionEvent, 'id'>) {
    return this.databaseClient.collectionEvent.create({
      data,
    });
  }

  updateEvent(id: number, data: Partial<Omit<CollectionEvent, 'id'>>) {
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
