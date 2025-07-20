import { LocalStorageKey } from '@/common';

export const LocalStorage = {
  getItem<T>(key: LocalStorageKey): T | null {
    try {
      const storageData = localStorage.getItem(key);

      if (!storageData) {
        return null;
      }

      const parsedData = JSON.parse(storageData);

      return parsedData as T;
    } catch (_error) {
      return null;
    }
  },

  setItem<T>(key: LocalStorageKey, data: T): void {
    try {
      const dataString = JSON.stringify(data);

      localStorage.setItem(key, dataString);
    } catch (_error: any) {
      return;
    }
  },

  removeItem(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  },

  clearStorage(): void {
    localStorage.clear();
  },
};
