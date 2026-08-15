import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKey } from '~/shared/services';
import type { MixedId } from '~/shared/types';

export const getAwardQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: [queryKey('awards.getById')],
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.awards.getById({ params: { id } });
    },
  });
};
