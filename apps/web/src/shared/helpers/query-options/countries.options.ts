import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const buildGetCountriesListQueryOptions = (
  queryParams: QueryParams<typeof api.countries.getList>,
) => {
  return queryOptions({
    queryKey: queryKey('countries.getList', queryParams),
    queryFn: () => api.countries.getList({ queryParams }),
  });
};
