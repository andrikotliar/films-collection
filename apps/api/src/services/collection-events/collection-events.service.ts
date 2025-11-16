import type { CollectionsService } from '~/services/collections/collections.service';
import { CollectionEventsRepository } from './collection-events.repository';
import { CreateCollectionEventPayload, UpdateCollectionEventPayload } from './schemas';
import type { Deps } from '~/shared';

export class CollectionEventsService {
  private readonly collectionEventsRepository: CollectionEventsRepository;
  private readonly collectionService: CollectionsService;

  constructor(deps: Deps<'collectionEventsRepository' | 'collectionsService'>) {
    this.collectionEventsRepository = deps.collectionEventsRepository;
    this.collectionService = deps.collectionsService;
  }

  async findTodayEvents() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();

    const dateCode = month * 100 + date;

    const events = await this.collectionEventsRepository.getEvents(dateCode);

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
