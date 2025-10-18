import { type ListOption, apiClient } from '~/common';

export type ChapterKey = {
  key: string;
};

export const ChapterKeysApi = {
  getListOptions() {
    return apiClient.get<ListOption[]>('/chapter-keys/options');
  },

  addKey() {
    return apiClient.post<ChapterKey>('/chapter-keys');
  },
};
