import { apiClient } from '@/services';
import { GeneralData } from '@/types';

export const StudiosApi = {
  getBaseDataList() {
    return apiClient.get<GeneralData[]>('/studios');
  },

  createStudio(payload: Omit<GeneralData, 'id'>) {
    return apiClient.post('/studios', {
      payload,
    });
  },

  deleteStudio(id: number) {
    return apiClient.delete('/studios/:id', {
      params: { id },
    });
  },

  updateStudio(id: number, payload: Omit<GeneralData, 'id'>) {
    return apiClient.patch('/studios/:id', {
      params: {
        id,
      },
      payload,
    });
  },
};
