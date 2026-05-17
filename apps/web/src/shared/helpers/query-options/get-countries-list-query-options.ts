import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getCountriesListQueryOptions = (
  queryParams: QueryParams<typeof api.countries.getList.exec>,
) => {
  return queryOptions({
    queryKey: [api.countries.getList.staticKey, queryParams],
    queryFn: () => api.countries.getList.exec({ queryParams }),
  });
};
