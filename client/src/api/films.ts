import { apiClient } from '@/services';
import {
  FilmDetails,
  FilmSearchResult,
  FilmsListFilters,
  FilmsListResponse,
  FilmsAdminListResponse,
  Chapter,
} from '@/types';
import { AdminFilmsServerFilters } from '@/types';

export type RelatedChaptersFilter = {
  key: string;
  filmId?: number | null;
};

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
    return apiClient.get<FilmsAdminListResponse>('/films/admin', {
      queryParams: filters,
    });
  },

  getRelatedChapters(filter: RelatedChaptersFilter) {
    const queryParams: RelatedChaptersFilter = {
      key: filter.key,
    };

    if (filter.filmId) {
      queryParams.filmId = filter.filmId;
    }

    return apiClient.get<Chapter[]>('/films/chapters', {
      queryParams,
    });
  },

  deleteFilm(id: number) {
    return apiClient.delete('/films/admin/:id', {
      params: {
        id,
      },
    });
  },
};
