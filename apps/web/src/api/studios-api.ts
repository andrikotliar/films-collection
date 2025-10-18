import { apiClient, type Studio } from '~/common';

export const StudiosApi = {
  getBaseDataList() {
    return apiClient.get<Studio[]>('/studios');
  },

  create(payload: Omit<Studio, 'id'>) {
    return apiClient.post('/studios', {
      payload,
    });
  },

  delete(id: number) {
    return apiClient.delete('/studios/:id', {
      params: { id },
    });
  },

  update(id: number, payload: Omit<Studio, 'id'>) {
    return apiClient.patch('/studios/:id', {
      params: {
        id,
      },
      payload,
    });
  },
};
