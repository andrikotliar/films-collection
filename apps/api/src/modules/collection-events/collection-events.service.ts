import {
  PAGE_LIMITS,
  type CollectionEventsListResponse,
  type CommonListQueryParams,
  type CreateCollectionEventInput,
  type UpdateCollectionEventInput,
} from '@films-collection/shared';
import type { Inject } from '~/shared/types/inject.js';

export class CollectionEventsService {
  constructor(
    private readonly deps: Inject<'CollectionEventsRepository' | 'InMemoryCacheService'>,
  ) {
    deps.InMemoryCacheService.setDefaultValue('todayEvents', {
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
    const cachedData = this.deps.InMemoryCacheService.get('todayEvents');

    if (
      cachedData?.dateCode &&
      cachedData.dateCode >= startCode &&
      cachedData.dateCode <= endCode
    ) {
      this.deps.InMemoryCacheService.resetValue('todayEvents');
    }
  }

  async findTodayEvents() {
    const dateCode = this.getTodayCode();

    const cachedData = this.deps.InMemoryCacheService.get('todayEvents');

    if (dateCode === cachedData?.dateCode && cachedData.events) {
      return cachedData.events;
    }

    const events = await this.deps.CollectionEventsRepository.getEvents(dateCode);

    this.deps.InMemoryCacheService.set('todayEvents', {
      dateCode,
      events,
    });

    return events;
  }

  async createEvent(input: CreateCollectionEventInput) {
    const [createdEvent] = await this.deps.CollectionEventsRepository.createEvent(
      input,
    ).returning();

    this.resetCachedEvent(createdEvent.startDateCode, createdEvent.endDateCode);

    return createdEvent;
  }

  async deleteEvent(id: number) {
    await this.deps.CollectionEventsRepository.deleteEvent(id);
  }

  async updateEvent(id: number, input: UpdateCollectionEventInput) {
    const [updatedEvent] = await this.deps.CollectionEventsRepository.updateEvent(
      id,
      input,
    ).returning();

    this.resetCachedEvent(updatedEvent.startDateCode, updatedEvent.endDateCode);

    return updatedEvent;
  }

  async getList(queries: CommonListQueryParams): Promise<CollectionEventsListResponse> {
    const { list, total } = await this.deps.CollectionEventsRepository.getList(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
  }
}
