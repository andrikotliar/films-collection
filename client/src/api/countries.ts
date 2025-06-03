import { apiClient } from '@/services';
import { GeneralData } from '@/types';

export const CountriesApi = {
  getBaseDataList() {
    return apiClient.get<GeneralData[]>('/countries');
  },

  createCountry(payload: Omit<GeneralData, 'id'>) {
    return apiClient.post('/countries', {
      payload,
    });
  },

  deleteCountry(id: number) {
    return apiClient.delete('/countries/:id', {
      params: { id },
    });
  },

  updateCountry(id: number, payload: Omit<GeneralData, 'id'>) {
    return apiClient.patch('/countries/:id', {
      params: {
        id,
      },
      payload,
    });
  },
};
