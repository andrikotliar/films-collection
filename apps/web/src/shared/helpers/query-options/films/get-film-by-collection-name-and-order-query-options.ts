import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getFilmByCollectionNameAndOrderQueryOptions = (title: string) => {
  return queryOptions({
    queryKey: [queryKey('films.getFilmByCollectionName')],
    queryFn: () => api.films.getFilmByCollectionName({ queryParams: { title } }),
  });
};
