import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getFilmChaptersQueryOptions = (chapterKey: string | null) => {
  return queryOptions({
    queryKey: [queryKey('films.getRelatedChapters'), chapterKey],
    queryFn: () => api.films.getRelatedChapters({ params: { key: chapterKey ?? '' } }),
    enabled: chapterKey !== null,
  });
};
