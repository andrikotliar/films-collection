import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKeys } from '~/shared/services';
import type { MixedId } from '~/shared/types';

export const getAwardQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: queryKeys.awards.get({ params: { id: +id } }),
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.awards.get({ params: { id } });
    },
    enabled: !isNewItem(id),
    gcTime: 0,
  });
};
