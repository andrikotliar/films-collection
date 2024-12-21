import { FilmsApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchFilmQuery = (filmId: string) => {
  return queryOptions({
    queryKey: ['film', filmId],
    queryFn: ({ queryKey }) => FilmsApi.getFilm(queryKey[1]),
    retry: false,
  });
};
