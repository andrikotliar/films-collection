import { apiClient } from '@/services';
import { AwardNomination } from '@/types';

export const AwardsApi = {
  getNominationsByAward(awardId: number | null) {
    return apiClient.get<AwardNomination[]>('/awards/nominations', {
      queryParams: { awardId },
    });
  },
};
