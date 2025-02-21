import { AwardsRepository } from './awards.repository';

export class AwardsService {
  constructor(private awardsRepository: AwardsRepository) {}

  getListBaseData(ids: number[]) {
    return this.awardsRepository.getBaseDataList(ids);
  }

  getAwardById(id: number) {
    return this.awardsRepository.getById(id);
  }
}
