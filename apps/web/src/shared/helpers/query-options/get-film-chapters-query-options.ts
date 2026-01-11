import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getFilmChaptersQueryOptions = (chapterKey: string | null) => {
  return queryOptions({
    queryKey: queryKeys.films.chapters.get({ params: { key: chapterKey ?? '' } }),
    queryFn: () => api.films.chapters.get({ params: { key: chapterKey ?? '' } }),
    enabled: chapterKey !== null,
  });
};
