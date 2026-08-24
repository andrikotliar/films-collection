import type {
  CollectionCurrentEventsListResponseSchema,
  FilmStatsResponse,
} from '@films-collection/shared';
import type { z } from 'zod';
import type { Film } from '~/database/schema.js';

type Store = {
  todayEvents: {
    dateCode: number;
    events: z.infer<typeof CollectionCurrentEventsListResponseSchema> | null;
  };
  filmsCount: number;
  anniversary: {
    date: string | null;
    film: Pick<Film, 'poster'> | null;
  };
  statistic: FilmStatsResponse['stats'];
};

export class InMemoryCacheService {
  private store = new Map<keyof Store, Store[keyof Store]>();
  private readonly initialState = new Map<keyof Store, Store[keyof Store]>();

  get<K extends keyof Store>(key: K): Store[K] {
    return this.store.get(key) as Store[K];
  }

  async getOrSet<K extends keyof Store>(
    key: K,
    getSetValue: () => Promise<Store[K]>,
  ): Promise<Store[K]> {
    const cachedValue = this.get(key);

    if (!cachedValue) {
      const newValue = await getSetValue();

      this.set(key, newValue);

      return newValue;
    }

    return cachedValue;
  }

  set<K extends keyof Store>(key: K, value: Store[K]) {
    this.store.set(key, value);
  }

  setDefaultValue<K extends keyof Store>(key: K, value: Store[K]) {
    this.store.set(key, value);
    this.initialState.set(key, value);
  }

  reset() {
    this.store = new Map(this.initialState);
  }

  resetValue<K extends keyof Store>(key: K) {
    const initialValue = this.initialState.get(key) as Store[K] | undefined;

    if (initialValue === undefined) {
      return;
    }

    this.set(key, initialValue);
  }

  getStore() {
    return Object.fromEntries(this.store);
  }
}
