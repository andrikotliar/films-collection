import { apiClient } from '@/services';
import { GeneralData } from '@/types';

export const GenresApi = {
  getBaseDataList() {
    return apiClient.get<GeneralData[]>('/genres');
  },

  createGenre(data: Omit<GeneralData, 'id'>) {
    return apiClient.post('/genres', {
      payload: data,
    });
  },

  deleteGenre(id: number) {
    return apiClient.delete('/genres/:id', {
      params: {
        id,
      },
    });
  },

  updateGenre(id: number, payload: Omit<GeneralData, 'id'>) {
    return apiClient.patch('/genres/:id', {
      params: { id },
      payload,
    });
  },
};
