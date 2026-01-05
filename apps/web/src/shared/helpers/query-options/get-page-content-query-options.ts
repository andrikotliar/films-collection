import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKeys } from '~/shared/services';
import type { MixedId } from '~/shared/types';

export const getPageContentByIdQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: queryKeys.pageContent.get({ params: { id: Number(id) } }),
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.pageContent.get({ params: { id } });
    },
    enabled: !!id,
    gcTime: 0,
  });
};
