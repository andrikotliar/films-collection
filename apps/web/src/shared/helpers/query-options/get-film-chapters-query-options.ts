import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getFilmChaptersQueryOptions = (
  filmId: number,
  chapterKey: string,
  isEnabled: boolean,
) => {
  return queryOptions({
    queryKey: queryKeys.films.chapters.get({ params: { id: filmId, key: chapterKey } }),
    queryFn: () => api.films.chapters.get({ params: { id: filmId, key: chapterKey } }),
    enabled: isEnabled,
  });
};
