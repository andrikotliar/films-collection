import { LocalStorageKey } from '@/enums';

export const LocalStorage = {
  getItem<T>(key: LocalStorageKey): T | null {
    try {
      const storageData = localStorage.getItem(key);

      if (!storageData) {
        return null;
      }

      const parsedData = JSON.parse(storageData);

      return parsedData as T;
    } catch (error: any) {
      return null;
    }
  },

  setItem<T extends unknown>(key: LocalStorageKey, data: T): void {
    try {
      const dataString = JSON.stringify(data);

      localStorage.setItem(key, dataString);
    } catch (error: any) {
      console.error('[Local Storage]', error?.message);
    }
  },

  removeItem(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  },

  clearStorage(): void {
    localStorage.clear();
  },
};
