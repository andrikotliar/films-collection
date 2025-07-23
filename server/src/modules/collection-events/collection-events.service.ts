import { CollectionEventsRepository } from './collection-events.repository';
import {
  CreateCollectionEventPayload,
  UpdateCollectionEventPayload,
} from './schemas';
import { FilesService } from 'src/modules/files/files.service';
import { NotFoundException } from 'src/common';

type EventDate = {
  month: number;
  date: number;
};

export class CollectionEventsService {
  constructor(
    private collectionEventsRepository: CollectionEventsRepository,
    private filesService: FilesService,
  ) {}

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

  createEvent(input: CreateCollectionEventPayload) {
    return this.collectionEventsRepository.createEvent(input);
  }

  async deleteEvent(id: number) {
    const event = await this.collectionEventsRepository.getEventById(id);

    if (!event) {
      throw new NotFoundException({ message: `Event #${id} not found` });
    }

    await this.filesService.delete(event.image);

    return this.collectionEventsRepository.deleteEvent(id);
  }

  async updateEvent(id: number, input: UpdateCollectionEventPayload) {
    return this.collectionEventsRepository.updateEvent(id, input);
  }

  getAllEvents() {
    return this.collectionEventsRepository.getAllEvents();
  }

  private convertDateToCode(date: EventDate) {
    return date.month * 100 + date.date;
  }
}
