import { CountriesApi } from '~/api';
import { queryKeys } from '~/lib/configs';
import { queryOptions } from '@tanstack/react-query';

export const fetchCountriesListQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.countries.list],
    queryFn: CountriesApi.getBaseDataList,
  });
};
