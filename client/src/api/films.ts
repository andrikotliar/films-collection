import { apiClient } from '@/services';
import {
  FilmAnniversary,
  FilmData,
  FilmSearchResult,
  FilmsListFilters,
  FilmsListResponse,
} from '@/types';

export const FilmsApi = {
  getList(filters: FilmsListFilters) {
    return apiClient.get<FilmsListResponse>('/films', { queryParams: filters });
  },

  getFilm(id: string) {
    return apiClient.get<FilmData>('/films/:filmId', {
      params: { filmId: id },
    });
  },

  getAnniversaries() {
    return apiClient.get<FilmAnniversary[]>('/films/anniversaries');
  },

  search(searchString: string | null) {
    return apiClient.get<FilmSearchResult[]>(`/films/search`, {
      queryParams: {
        q: searchString,
      },
    });
  },
};
