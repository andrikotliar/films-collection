import type {
  CreateCollectionEventInput,
  UpdateCollectionEventInput,
} from '@films-collection/shared';
import type { Deps } from '~/shared';

export class CollectionEventsService {
  constructor(private readonly deps: Deps<'collectionEventsRepository' | 'collectionsService'>) {}

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
    const events = await this.deps.collectionEventsRepository.getAllEvents();

    const eventsWithCount = events.map(async (event) => {
      const count = await this.deps.collectionsService.countFilmsByCollection(event.collection.id);

      return {
        ...event,
        filmsCount: count,
      };
    });

    return await Promise.all(eventsWithCount);
  }
}
