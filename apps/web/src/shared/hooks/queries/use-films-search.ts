import { api, queryKeys } from '~/shared/services';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getFilmsSearchQueryOptions = (searchString: string | null) => {
  return queryOptions({
    queryKey: queryKeys.films.search.list({ queryParams: { q: searchString } }),
    queryFn: async () => {
      if (!searchString) {
        return null;
      }

      return await api.films.search.list({ queryParams: { q: searchString } });
    },
  });
};

export const useFilmsSearch = (searchString: string | null) => {
  return useSuspenseQuery(getFilmsSearchQueryOptions(searchString));
};
