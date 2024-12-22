import { apiClient } from '@/services';
import { PendingFilm, PendingFilmServerFilters } from '@/types';

type UpdatePendingFilmParams = {
  filmId: string;
  payload: Pick<PendingFilm, 'title' | 'priority'>;
};

type PendingFilmsListResponse = {
  list: PendingFilm[];
  total: number;
};

export const PendingFilmsApi = {
  getPendingFilms(filters: PendingFilmServerFilters) {
    return apiClient.get<PendingFilmsListResponse>('/pending-films', filters);
  },

  createPendingFilm(data: Pick<PendingFilm, 'title' | 'priority'>) {
    return apiClient.post<PendingFilm>('/pending-films', {
      payload: data,
    });
  },

  deletePendingFilm(id: string) {
    return apiClient.delete(`/pending-films/${id}`);
  },

  updatePendingFilm(params: UpdatePendingFilmParams) {
    return apiClient.patch(`/pending-films/${params.filmId}`, {
      payload: params.payload,
    });
  },
};
