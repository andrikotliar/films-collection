import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getGenresListQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.genres.list(),
    queryFn: api.genres.list,
  });
};

export const useSuspenseGenresList = () => {
  return useSuspenseQuery(getGenresListQueryOptions());
};
