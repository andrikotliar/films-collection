import { apiClient } from '@/services';
import { ListOption } from '@/types';

export type AwardNomination = ListOption<number> & {
  shouldIncludeActor: boolean;
};

export const AwardsApi = {
  getNominationsByAward(awardId: number | null) {
    return apiClient.get<AwardNomination[]>('/awards/nominations', {
      queryParams: { awardId },
    });
  },
};
