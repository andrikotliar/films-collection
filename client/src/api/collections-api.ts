import { apiClient } from '@/services';
import type { Collection, ListOption, OmitId } from '@/common';

export type BaseDataListResponse = {
  list: Collection[];
  categories: ListOption[];
};

export const CollectionsApi = {
  getBaseDataList() {
    return apiClient.get<BaseDataListResponse>('/collections');
  },

  delete(id: number) {
    return apiClient.delete('/collections/:id', {
      params: { id },
    });
  },

  update(id: number, payload: Partial<OmitId<Collection>>) {
    return apiClient.patch<Collection>('/collections/:id', {
      params: { id },
      payload,
    });
  },

  create(payload: OmitId<Collection>) {
    return apiClient.post<Collection>('/collections', {
      payload,
    });
  },
};
