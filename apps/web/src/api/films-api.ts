import {
  type FilmDetails,
  type FilmSearchResult,
  type FilmsListFilters,
  type FilmsListResponse,
  type FilmsAdminListResponse,
  type Chapter,
  type AdminFilmsServerFilters,
  type ListOption,
  apiClient,
} from '~/lib';

export type RelatedChaptersFilter = {
  key: string;
  filmId?: number | null;
};

export const FilmsApi = {
  getList(filters: FilmsListFilters) {
    return apiClient.get<FilmsListResponse>('/films', { queryParams: filters });
  },

  getFilm(id: string) {
    return apiClient.get<FilmDetails>('/films/:id', {
      params: { id },
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

  delete(id: number) {
    return apiClient.delete('/films/admin/:id', {
      params: {
        id,
      },
    });
  },

  getOptions(searchString: string | null, selected?: (string | number)[]) {
    const queryParams: Record<string, unknown> = {};

    if (searchString) {
      queryParams.q = searchString;
    }

    if (selected) {
      queryParams.selected = selected;
    }

    return apiClient.get<ListOption<number>[]>('/films/options', {
      queryParams,
    });
  },
};
