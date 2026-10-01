import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKey } from '~/shared/services';
import type { MixedId, QueryParams } from '~/shared/types';

export const buildGetAwardQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: queryKey('awards.getById'),
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.awards.getById({ params: { id } });
    },
  });
};

export const buildGetAwardsBaseDataListQueryOptions = (
  queryParams: QueryParams<typeof api.awards.getList>,
) => {
  return queryOptions({
    queryKey: queryKey('awards.getList', queryParams),
    queryFn: () => api.awards.getList({ queryParams }),
  });
};

export const buildGetNominationsByAwardQueryOptions = (awardId: number | null) => {
  return queryOptions({
    queryKey: queryKey('awards.getNominations', awardId),
    queryFn: () => api.awards.getNominations({ params: { id: awardId } }),
    enabled: Boolean(awardId),
  });
};
