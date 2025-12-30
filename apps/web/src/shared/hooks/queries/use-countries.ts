import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getCountriesListQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.countries.list(),
    queryFn: api.countries.list,
  });
};

export const useSuspenseCountries = () => {
  return useSuspenseQuery(getCountriesListQueryOptions());
};
