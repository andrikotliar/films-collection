import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getNominationsByAwardQueryOptions = (awardId: number | null) => {
  return queryOptions({
    queryKey: queryKeys.awards.nominations.get({ params: { id: awardId } }),
    queryFn: () => api.awards.nominations.get({ params: { id: awardId } }),
    enabled: Boolean(awardId),
  });
};
