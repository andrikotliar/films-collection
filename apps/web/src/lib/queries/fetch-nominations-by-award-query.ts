import { AwardsApi } from '~/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchNominationsByAwardQuery = (awardId: number | null) => {
  return queryOptions({
    queryKey: ['awardNominations', awardId] as const,
    queryFn: ({ queryKey }) => AwardsApi.getNominationsByAward(queryKey[1]),
    enabled: Boolean(awardId),
  });
};
