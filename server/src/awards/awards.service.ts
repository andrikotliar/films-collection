import { AwardModel } from './awards.model';

export class AwardsService {
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
