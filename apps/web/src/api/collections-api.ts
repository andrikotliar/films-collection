import { apiClient } from '~/services';
import type { Collection, OmitId } from '~/common';

export const CollectionsApi = {
  getBaseDataList() {
    return apiClient.get<Collection[]>('/collections');
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
