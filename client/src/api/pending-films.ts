import { apiClient } from '@/services';
import { PendingFilm, PendingFilmServerFilters } from '@/types';

type PendingFilmsListResponse = {
  list: PendingFilm[];
  total: number;
};

export const PendingFilmsApi = {
  getPendingFilms(filters: PendingFilmServerFilters) {
    return apiClient.get<PendingFilmsListResponse>('/pending-films', {
      queryParams: filters,
    });
  },

  createPendingFilm(data: Omit<PendingFilm, 'id' | 'createdAt'>) {
    return apiClient.post<PendingFilm>('/pending-films', {
      payload: data,
    });
  },

  deletePendingFilm(id: number) {
    return apiClient.delete('/pending-films/:id', {
      params: { id },
    });
  },

  updatePendingFilm(
    id: number,
    payload: Partial<Omit<PendingFilm, 'id' | 'createdAt'>>,
  ) {
    return apiClient.patch('/pending-films/:id', {
      payload,
      params: { id },
    });
  },

  getPendingFilm(id: number) {
    return apiClient.get<PendingFilm>('/pending-films/:id', {
      params: { id },
    });
  },
};
