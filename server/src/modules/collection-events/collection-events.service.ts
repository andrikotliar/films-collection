import type { CollectionsService } from 'src/modules/collections/collections.service';
import { CollectionEventsRepository } from './collection-events.repository';
import { CreateCollectionEventPayload, UpdateCollectionEventPayload } from './schemas';

export class CollectionEventsService {
  constructor(
    private readonly collectionEventsRepository: CollectionEventsRepository,
    private readonly collectionService: CollectionsService,
  ) {}

  async findTodayEvents() {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = String(currentDate.getDate()).padStart(2, '0');

    const dateString = `2000-${month}-${date}`;

    const events = await this.collectionEventsRepository.getEvents(dateString);

    return events ?? [];
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

  async getAllEvents() {
    const events = await this.collectionEventsRepository.getAllEvents();

    const eventsWithCount = events.map(async (event) => {
      const count = await this.collectionService.countFilmsByCollection(event.collection.id);

      return {
        ...event,
        filmsCount: count,
      };
    });

    return await Promise.all(eventsWithCount);
  }
}
