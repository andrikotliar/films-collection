import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKey } from '~/shared/services';
import type { MixedId } from '~/shared/types';

export const getFilmsByCollectionQueryOptions = (collectionId: MixedId) => {
  return queryOptions({
    queryKey: [queryKey('films.getByCollection'), collectionId],
    queryFn: () => {
      if (isNewItem(collectionId)) {
        return;
      }

      return api.films.getByCollection({ params: { id: collectionId } });
    },
    enabled: !!collectionId && !isNewItem(collectionId),
  });
};
