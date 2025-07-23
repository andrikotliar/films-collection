import { PrismaClient } from '@prisma/client';
import { GetEventQueryResult } from './types';
import {
  CreateCollectionEventPayload,
  UpdateCollectionEventPayload,
} from 'src/modules/collection-events/schemas';

type GetEventParams = {
  date: number;
  month: number;
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

  getEvent({ date, month }: GetEventParams) {
    return this.databaseClient.$queryRaw<GetEventQueryResult[]>`
      SELECT
        ce.title,
        c.id as "collectionId",
        ce.start_date as "startDate",
        ce.start_month as "startMonth",
        ce.end_date as "endDate",
        ce.end_month as "endMonth",
        ce.background,
        ce.year_from as "yearFrom"
      FROM collection_events ce
      INNER JOIN collections c ON c.id = ce.collection_id
      WHERE
        ce.start_date = ${date}
        AND ce.start_month = ${month}
        OR (
          ce.start_month <= ce.end_month
          AND ${date} BETWEEN ce.start_date AND ce.end_date
          AND ${month} BETWEEN ce.start_month AND ce.end_month
        )
        OR (
          ce.start_month > ce.end_month
          AND (${date} >= ce.start_date OR ${date} <= ce.end_date)
          AND (${month} >= ce.start_month OR ${month} <= ce.end_month)
        );
    `;
  }

  getAllEvents() {
    return this.databaseClient.collectionEvent.findMany({
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        startMonth: true,
        endMonth: true,
        yearFrom: true,
        background: true,
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
