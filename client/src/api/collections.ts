import { apiClient } from '@/services';
import { Collection, ListOption } from '@/common';

export type BaseDataListResponse = {
  list: Collection[];
  categories: ListOption[];
};

export const CollectionsApi = {
  getBaseDataList() {
    return apiClient.get<BaseDataListResponse>('/collections');
  },

  deleteCollection(id: number) {
    return apiClient.delete('/collections/:id', {
      params: { id },
    });
  },

  updateCollection(id: number, payload: Partial<Omit<Collection, 'id'>>) {
    return apiClient.patch<Collection>('/collections/:id', {
      params: { id },
      payload,
    });
  },

  createCollection(payload: Omit<Collection, 'id'>) {
    return apiClient.post('/collections', {
      payload,
    });
  },
};
