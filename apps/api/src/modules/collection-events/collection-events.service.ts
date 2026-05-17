import {
  PAGE_LIMITS,
  type CollectionCurrentEventsListResponseSchema,
  type CommonListQueryParams,
  type CreateCollectionEventInput,
  type UpdateCollectionEventInput,
} from '@films-collection/shared';
import type { z } from 'zod';
import { InMemoryCacheService } from '~/modules/cache/cache.service.js';
import { listResponse, type Deps } from '~/shared/index.js';

type CacheParams = {
  todayEvents: {
    dateCode: number;
    events: z.infer<typeof CollectionCurrentEventsListResponseSchema> | null;
  };
};

export class CollectionEventsService {
  private readonly cache = new InMemoryCacheService<CacheParams>({
    todayEvents: {
      dateCode: 0,
      events: null,
    },
  });

  constructor(private readonly deps: Deps<'collectionEventsRepository'>) {}

  private getTodayCode() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();

    const dateCode = month * 100 + date;

    return dateCode;
  }

  private resetCachedEvent(startCode: number, endCode: number) {
    const cachedData = this.cache.get('todayEvents');

    if (
      cachedData?.dateCode &&
      cachedData.dateCode >= startCode &&
      cachedData.dateCode <= endCode
    ) {
      this.cache.resetValue('todayEvents');
    }
  }

  async findTodayEvents() {
    const dateCode = this.getTodayCode();

    const cachedData = this.cache.get('todayEvents');

    if (dateCode === cachedData?.dateCode && cachedData.events) {
      return cachedData.events;
    }

    const events = await this.deps.collectionEventsRepository.getEvents(dateCode);

    this.cache.set('todayEvents', {
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

  async getList(queries: CommonListQueryParams) {
    const { list, total } = await this.deps.collectionEventsRepository.getList(queries);

    return listResponse({ list, total, pageLimit: PAGE_LIMITS.default });
  }
}
