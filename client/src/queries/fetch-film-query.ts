import { apiClient } from '@/services';
import { FilmData } from '@/types';
import { queryOptions } from '@tanstack/react-query';

const fetchFilmQuery = (filmId: string) => {
  return queryOptions({
    queryKey: ['film', filmId],
    queryFn: ({ queryKey }) => apiClient.get<FilmData>(`/films/${queryKey[1]}`),
    retry: false,
  });
};

export { fetchFilmQuery };
