import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getHobbyWithItemsQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: [queryKey('hobbies.getHobby'), id],
    queryFn: () => api.hobbies.getHobby({ params: { id: Number(id) }, queryParams: {} }),
  });
};
