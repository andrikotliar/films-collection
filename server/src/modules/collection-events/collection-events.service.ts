import { CollectionEvent } from '@prisma/client';
import { CollectionEventsRepository } from './collection-events.repository';
import {
  CollectionEventsCreatePayload,
  CollectionEventsUpdatePayload,
} from './schemas';

type EventDate = {
  month: number;
  date: number;
};

export class CollectionEventsService {
  constructor(private collectionEventsRepository: CollectionEventsRepository) {}

  async findTodayEvent() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();

    const currentDateCode = this.convertDateToCode({ month, date });

    const events = await this.collectionEventsRepository.getEvent(
      currentDateCode,
    );

    return {
      event: events[0] ?? null,
    };
  }

  createEvent(input: CollectionEventsCreatePayload) {
    const { startDate, endDate, ...data } = input;

    const startDateCode = this.convertDateToCode(startDate);
    const endDateCode = this.convertDateToCode(endDate);

    return this.collectionEventsRepository.createEvent({
      ...data,
      startDateCode,
      endDateCode,
    });
  }

  deleteEvent(id: number) {
    return this.collectionEventsRepository.deleteEvent(id);
  }

  updateEvent(id: number, input: CollectionEventsUpdatePayload) {
    const { startDate, endDate, ...data } = input;

    const payload: Partial<Omit<CollectionEvent, 'id'>> = { ...data };

    if (startDate) {
      payload.startDateCode = this.convertDateToCode(startDate);
    }

    if (endDate) {
      payload.endDateCode = this.convertDateToCode(endDate);
    }

    return this.collectionEventsRepository.updateEvent(id, payload);
  }

  getAllEvents() {
    return this.collectionEventsRepository.getAllEvents();
  }

  private convertDateToCode(date: EventDate) {
    return date.month * 100 + date.date;
  }
}
