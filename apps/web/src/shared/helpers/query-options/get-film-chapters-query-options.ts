import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getFilmChaptersQueryOptions = (chapterKey: string | null) => {
  return queryOptions({
    queryKey: [api.films.getRelatedChapters.staticKey, chapterKey],
    queryFn: () => api.films.getRelatedChapters.exec({ params: { key: chapterKey ?? '' } }),
    enabled: chapterKey !== null,
  });
};
