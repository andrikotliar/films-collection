import {
  PAGE_LIMITS,
  type CollectionEventsListResponse,
  type CommonListQueryParams,
  type CreateCollectionEventInput,
  type UpdateCollectionEventInput,
} from '@films-collection/shared';
import type { Deps } from '~/shared/types/deps.js';

export class CollectionEventsService {
  constructor(private readonly deps: Deps<'collectionEventsRepository' | 'inMemoryCacheService'>) {
    deps.inMemoryCacheService.setDefaultValue('todayEvents', {
      dateCode: 0,
      events: null,
    });
  }

  private getTodayCode() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();

    const dateCode = month * 100 + date;

    return dateCode;
  }

  private resetCachedEvent(startCode: number, endCode: number) {
    const cachedData = this.deps.inMemoryCacheService.get('todayEvents');

    if (
      cachedData?.dateCode &&
      cachedData.dateCode >= startCode &&
      cachedData.dateCode <= endCode
    ) {
      this.deps.inMemoryCacheService.resetValue('todayEvents');
    }
  }

  async findTodayEvents() {
    const dateCode = this.getTodayCode();

    const cachedData = this.deps.inMemoryCacheService.get('todayEvents');

    if (dateCode === cachedData?.dateCode && cachedData.events) {
      return cachedData.events;
    }

    const events = await this.deps.collectionEventsRepository.getEvents(dateCode);

    this.deps.inMemoryCacheService.set('todayEvents', {
      dateCode,
      events,
    });

    return events;
  }

  async createEvent(input: CreateCollectionEventInput) {
    const [createdEvent] = await this.deps.collectionEventsRepository
      .createEvent(input)
      .returning();

    this.resetCachedEvent(createdEvent.startDateCode, createdEvent.endDateCode);

    return createdEvent;
  }

  async deleteEvent(id: number) {
    await this.deps.collectionEventsRepository.deleteEvent(id);
  }

  async updateEvent(id: number, input: UpdateCollectionEventInput) {
    const [updatedEvent] = await this.deps.collectionEventsRepository
      .updateEvent(id, input)
      .returning();

    this.resetCachedEvent(updatedEvent.startDateCode, updatedEvent.endDateCode);

    return updatedEvent;
  }

  async getList(queries: CommonListQueryParams): Promise<CollectionEventsListResponse> {
    const { list, total } = await this.deps.collectionEventsRepository.getList(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
  }
}
