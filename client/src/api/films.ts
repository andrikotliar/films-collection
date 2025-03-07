import { apiClient } from '@/services';
import {
  FilmDetails,
  FilmSearchResult,
  FilmsListFilters,
  FilmsListResponse,
  FilmsAdminListItem,
} from '@/types';
import { AdminFilmsServerFilters } from '@/types';

export const FilmsApi = {
  getList(filters: FilmsListFilters) {
    return apiClient.get<FilmsListResponse>('/films', { queryParams: filters });
  },

  getFilm(id: string) {
    return apiClient.get<FilmDetails>('/films/:filmId', {
      params: { filmId: id },
    });
  },

  search(searchString: string | null) {
    return apiClient.get<FilmSearchResult[]>(`/films/search`, {
      queryParams: {
        q: searchString,
      },
    });
  },

  getAdminFilmsList(filters: AdminFilmsServerFilters) {
    return apiClient.get<FilmsAdminListItem[]>('/films/admin', {
      queryParams: filters,
    });
  },
};
