import { apiClient } from '@/services';
import { Collection } from '@/types';

export const CollectionsApi = {
  getBaseDataList() {
    return apiClient.get<Collection[]>('/collections');
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
