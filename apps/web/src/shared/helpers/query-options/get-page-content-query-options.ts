import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKey } from '~/shared/services';
import type { MixedId } from '~/shared/types';

export const getPageContentByIdQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: [queryKey('pageContent.getById'), id],
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.pageContent.getById({ params: { id } });
    },
    enabled: !!id,
    gcTime: 0,
  });
};
