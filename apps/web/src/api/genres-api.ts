import { apiClient, type Genre } from '~/lib';

export const GenresApi = {
  getBaseDataList() {
    return apiClient.get<Genre[]>('/genres');
  },

  create(data: Omit<Genre, 'id'>) {
    return apiClient.post('/genres', {
      payload: data,
    });
  },

  delete(id: number) {
    return apiClient.delete('/genres/:id', {
      params: {
        id,
      },
    });
  },

  update(id: number, payload: Omit<Genre, 'id'>) {
    return apiClient.patch('/genres/:id', {
      params: { id },
      payload,
    });
  },
};
