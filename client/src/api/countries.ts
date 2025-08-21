import { apiClient } from '@/services';
import { type Country } from '@/common';

export const CountriesApi = {
  getBaseDataList() {
    return apiClient.get<Country[]>('/countries');
  },

  create(payload: Omit<Country, 'id'>) {
    return apiClient.post('/countries', {
      payload,
    });
  },

  delete(id: number) {
    return apiClient.delete('/countries/:id', {
      params: { id },
    });
  },

  update(id: number, payload: Omit<Country, 'id'>) {
    return apiClient.patch('/countries/:id', {
      params: {
        id,
      },
      payload,
    });
  },
};
