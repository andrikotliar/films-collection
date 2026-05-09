import {
  PAGE_LIMITS,
  type CreateCollectionEventInput,
  type UpdateCollectionEventInput,
} from '@films-collection/shared';
import { listResponse, type Deps } from '~/shared';

export class CollectionEventsService {
  constructor(private readonly deps: Deps<'collectionEventsRepository'>) {}

  async findTodayEvents() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();

    const dateCode = month * 100 + date;

    const events = await this.deps.collectionEventsRepository.getEvents(dateCode);

    return events;
  }

  async createEvent(input: CreateCollectionEventInput) {
    const [createdEvent] = await this.deps.collectionEventsRepository
      .createEvent(input)
      .returning();

    return createdEvent;
  }

  async deleteEvent(id: number) {
    await this.deps.collectionEventsRepository.deleteEvent(id);
  }

  async updateEvent(id: number, input: UpdateCollectionEventInput) {
    const [updatedEvent] = await this.deps.collectionEventsRepository
      .updateEvent(id, input)
      .returning();

    return updatedEvent;
  }

  async getAllEvents() {
    const list = await this.deps.collectionEventsRepository.getAllEvents();
    const total = await this.deps.collectionEventsRepository.count();

    return listResponse({ list, total, pageLimit: PAGE_LIMITS.default });
  }
}
