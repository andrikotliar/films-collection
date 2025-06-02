import { apiClient } from '@/services';
import { Award, AwardNomination, Nomination } from '@/types';

type CreateAwardPayload = Omit<Award, 'id'> & {
  nominations: Omit<Nomination, 'person' | 'comment'>[];
};

type AwardWithNominations = Award & {
  nominations: Omit<Nomination, 'person' | 'comment'>[];
};

export const AwardsApi = {
  getBaseDataList() {
    return apiClient.get<Pick<Award, 'id' | 'title'>[]>('/awards');
  },

  getNominationsByAward(awardId: number | null) {
    return apiClient.get<AwardNomination[]>('/awards/nominations', {
      queryParams: { awardId },
    });
  },

  getById(id: number) {
    return apiClient.get<AwardWithNominations>('/awards/:id', {
      params: { id },
    });
  },

  createAward(payload: CreateAwardPayload) {
    return apiClient.post('/awards', {
      payload,
    });
  },

  deleteAward(id: number) {
    return apiClient.delete('/awards/:id', {
      params: { id },
    });
  },
};
