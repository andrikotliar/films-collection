import { AwardModel } from './awards.model';
import { IAwardsService } from './types';

class AwardsService implements IAwardsService {
  private awardsModel;

  constructor(awardsModel: typeof AwardModel) {
    this.awardsModel = awardsModel;
  }

  getAwardsBaseData(id: string[]) {
    return this.awardsModel
      .find(
        {
          _id: {
            $in: id,
          },
        },
        { nominations: 0 },
      )
      .lean();
  }
}

export { AwardsService };
