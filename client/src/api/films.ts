import { apiClient } from '@/services';
import {
  AdminFilmsListResponse,
  FilmData,
  FilmLinkItem,
  FilmSearchResult,
  FilmsListFilters,
  FilmsListResponse,
  RandomFilmsList,
  UpdateFilmPayload,
} from '@/types';
import { AdminFilmsServerFilters } from '@/types';

export const FilmsApi = {
  getList(filters: FilmsListFilters) {
    return apiClient.get<FilmsListResponse>('/films', filters);
  },

  getFilm(id: string) {
    return apiClient.get<FilmData>(`/films/${id}`);
  },

  getAnniversaries() {
    return apiClient.get<FilmLinkItem[]>('/films/anniversaries');
  },

  search(searchString: string | null) {
    return apiClient.get<FilmSearchResult[]>(`/films/search`, {
      q: searchString,
    });
  },

  getRandomFilms() {
    return apiClient.get<RandomFilmsList>('/films/random');
  },

  getAdminFilmsList(filters: AdminFilmsServerFilters) {
    return apiClient.get<AdminFilmsListResponse>('/films/admin/list', filters);
  },

  deleteFilm(id: string) {
    return apiClient.delete(`/films/admin/${id}`);
  },

  updateFilm(payload: UpdateFilmPayload) {
    return apiClient.patch(`/films/admin/${payload.id}`, {
      payload: payload.data,
    });
  },
};
