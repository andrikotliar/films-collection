import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys, api } from '~/shared/services';
import type { ExtractParams } from '~/shared/types';

type FilmsListParams = ExtractParams<typeof api.films.list>;

export const getFilmsListQueryOptions = (queryParams: FilmsListParams['queryParams']) => {
  return queryOptions({
    queryKey: queryKeys.films.list({ queryParams }),
    queryFn: () => api.films.list({ queryParams }),
  });
};

export const useSuspenseFilmsList = (queryParams: FilmsListParams['queryParams']) => {
  return useSuspenseQuery(getFilmsListQueryOptions(queryParams));
};
