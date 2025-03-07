import { apiClient } from '@/services';
import { PendingFilm, PendingFilmServerFilters } from '@/types';

type UpdatePendingFilmParams = {
  filmId: number;
  payload: Pick<PendingFilm, 'title' | 'priority'>;
};

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

  createPendingFilm(data: Pick<PendingFilm, 'title' | 'priority'>) {
    return apiClient.post<PendingFilm>('/pending-films', {
      payload: data,
    });
  },

  deletePendingFilm(id: number) {
    return apiClient.delete('/pending-films/:filmId', {
      params: { filmId: id },
    });
  },

  updatePendingFilm(params: UpdatePendingFilmParams) {
    return apiClient.patch('/pending-films/:filmId', {
      payload: params.payload,
      params: { filmId: params.filmId },
    });
  },
};
