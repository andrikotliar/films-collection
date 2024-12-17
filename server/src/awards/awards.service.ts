import { AwardModel } from './awards.model';

class AwardsService {
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
