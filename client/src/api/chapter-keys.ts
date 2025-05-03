import { apiClient } from '@/services';
import { ListOption } from '@/types';

export const ChapterKeysApi = {
  getListOptions() {
    return apiClient.get<ListOption[]>('/chapter-keys/options');
  },
};
