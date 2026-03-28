import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getCountriesListQueryOptions = () => {
  return queryOptions({
    queryKey: [api.countries.getList.staticKey],
    queryFn: () => api.countries.getList.exec(),
  });
};
