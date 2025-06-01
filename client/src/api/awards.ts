import { apiClient } from '@/services';
import { Award, AwardNomination } from '@/types';

export const AwardsApi = {
  getBaseDataList() {
    return apiClient.get<Pick<Award, 'id' | 'title'>[]>('/awards');
  },

  getNominationsByAward(awardId: number | null) {
    return apiClient.get<AwardNomination[]>('/awards/nominations', {
      queryParams: { awardId },
    });
  },

  deleteAward(id: number) {
    return apiClient.delete('/awards/:id', {
      params: { id },
    });
  },
};
