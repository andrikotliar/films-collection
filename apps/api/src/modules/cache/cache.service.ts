export class InMemoryCacheService<TStore extends Record<string, unknown>> {
  private store = new Map<keyof TStore, TStore[keyof TStore]>();
  private readonly initialState = new Map<keyof TStore, TStore[keyof TStore]>();

  constructor(params: TStore) {
    for (const [key, value] of Object.entries(params)) {
      this.store.set(key as keyof TStore, value as TStore[keyof TStore]);
      this.initialState.set(key as keyof TStore, value as TStore[keyof TStore]);
    }
  }

  get<K extends keyof TStore>(key: K): TStore[K] | undefined {
    return this.store.get(key) as TStore[K] | undefined;
  }

  async getOrSet<K extends keyof TStore>(
    key: K,
    getSetValue: () => Promise<TStore[K]>,
  ): Promise<TStore[K]> {
    const cachedValue = this.get(key);

    if (!cachedValue) {
      const newValue = await getSetValue();

      this.set(key, newValue);

      return newValue;
    }

    return cachedValue;
  }

  set<K extends keyof TStore>(key: K, value: TStore[K]) {
    this.store.set(key, value);
  }

  delete<K extends keyof TStore>(key: K) {
    this.store.delete(key);
  }

  reset() {
    this.store = new Map(this.initialState);
  }

  resetValue<K extends keyof TStore>(key: K) {
    const initialValue = this.initialState.get(key) as TStore[K] | undefined;

    if (initialValue === undefined) {
      return;
    }

    this.set(key, initialValue);
  }

  getStore() {
    return Object.fromEntries(this.store);
  }
}
