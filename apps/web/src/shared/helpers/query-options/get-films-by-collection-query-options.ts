import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getFilmsByCollectionQueryOptions = (collectionId: number) => {
  return queryOptions({
    queryKey: [queryKey('films.getByCollection'), collectionId],
    queryFn: () => api.films.getByCollection({ params: { id: collectionId } }),
    enabled: !!collectionId,
  });
};
