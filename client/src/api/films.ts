import { apiClient } from '@/services';
import {
  FilmAnniversary,
  FilmData,
  FilmLinkItem,
  FilmSearchResult,
  FilmsListFilters,
  FilmsListResponse,
  RandomFilmsList,
} from '@/types';

export const FilmsApi = {
  getList(filters: FilmsListFilters) {
    return apiClient.get<FilmsListResponse>('/films', filters);
  },

  getFilm(id: string) {
    return apiClient.get<FilmData>(`/films/${id}`);
  },

  getAnniversaries() {
    return apiClient.get<FilmAnniversary[]>('/films/anniversaries');
  },

  search(searchString: string | null) {
    return apiClient.get<FilmSearchResult[]>(`/films/search`, {
      q: searchString,
    });
  },

  getRandomFilms() {
    return apiClient.get<RandomFilmsList>('/films/random');
  },
};
