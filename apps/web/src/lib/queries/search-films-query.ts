import { FilmsApi } from '~/api';
import { queryKeys } from '~/lib/configs';
import { queryOptions } from '@tanstack/react-query';

export const searchFilmsQuery = (searchString: string | null) => {
  return queryOptions({
    queryKey: [queryKeys.films.search, searchString],
    queryFn: ({ queryKey }) => FilmsApi.search(queryKey[1]),
    enabled: Boolean(searchString),
    retry: false,
  });
};
