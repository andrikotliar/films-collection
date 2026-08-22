import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getHobbiesListQueryOptions = () => {
  return queryOptions({
    queryKey: [queryKey('hobbies.getHobbiesList')],
    queryFn: () => api.hobbies.getHobbiesList(),
  });
};
