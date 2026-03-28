import { api } from '~/shared/services';
import { queryOptions } from '@tanstack/react-query';

export const getFilmsSearchQueryOptions = (searchString: string | null) => {
  return queryOptions({
    queryKey: [api.films.search.staticKey, searchString],
    queryFn: async () => {
      if (!searchString) {
        return null;
      }

      return await api.films.search.exec({ queryParams: { q: searchString } });
    },
  });
};
