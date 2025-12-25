import { queryOptions, useQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

type AwardId = number | null;

export const getNominationsByAwardQueryOptions = (awardId: AwardId) => {
  return queryOptions({
    queryKey: queryKeys.awards.nominations.get({ params: { id: awardId } }),
    queryFn: () => api.awards.nominations.get({ params: { id: awardId } }),
    enabled: Boolean(awardId),
  });
};

export const useAwardNominations = (awardId: AwardId) => {
  return useQuery(getNominationsByAwardQueryOptions(awardId));
};
