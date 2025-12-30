import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys, api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

type FilmsListParams = QueryParams<typeof api.films.list>;

export const getFilmsListQueryOptions = (queryParams: FilmsListParams) => {
  return queryOptions({
    queryKey: queryKeys.films.list({ queryParams }),
    queryFn: () => api.films.list({ queryParams }),
  });
};

export const useSuspenseFilmsList = (queryParams: FilmsListParams) => {
  return useSuspenseQuery(getFilmsListQueryOptions(queryParams));
};
