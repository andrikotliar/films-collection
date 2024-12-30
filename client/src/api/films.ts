import { apiClient } from '@/services';
import {
  FilmData,
  FilmLinkItem,
  FilmsAdminListItem,
  FilmSearchResult,
  FilmsListFilters,
  FilmsListResponse,
  RandomFilmsList,
} from '@/types';
import { ManageFilmsServerFilters } from '@/types/manage-films-filters';

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

  getManageFilmsList(filters: ManageFilmsServerFilters) {
    return apiClient.get<FilmsAdminListItem[]>('/films/admin/list', filters);
  },
};
