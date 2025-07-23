import { CollectionEventsRepository } from './collection-events.repository';
import { CreateCollectionEventPayload, UpdateCollectionEventPayload } from './schemas';
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

    const events = await this.collectionEventsRepository.getEvent({ date, month });

    return {
      event: events[0] ?? null,
    };
  }

  createEvent(input: CreateCollectionEventPayload) {
    return this.collectionEventsRepository.createEvent(input);
  }

  async deleteEvent(id: number) {
    return this.collectionEventsRepository.deleteEvent(id);
  }

  async updateEvent(id: number, input: UpdateCollectionEventPayload) {
    return this.collectionEventsRepository.updateEvent(id, input);
  }

  getAllEvents() {
    return this.collectionEventsRepository.getAllEvents();
  }
}
