import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKeys } from '~/shared/services';
import type { MixedId } from '~/shared/types';

export const getAdminFilmDetailsQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: queryKeys.films.admin.get({ params: { id: Number(id) } }),
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.films.admin.get({ params: { id } });
    },
    enabled: !isNewItem(id),
  });
};
