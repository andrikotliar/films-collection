import { CountriesApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchCountriesListQuery = () => {
  return queryOptions({
    queryKey: ['countries', 'list'],
    queryFn: CountriesApi.getBaseDataList,
  });
};
