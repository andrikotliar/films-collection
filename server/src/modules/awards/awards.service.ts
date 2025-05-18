import { buildListOptions } from 'src/common';
import { AwardsRepository } from './awards.repository';
import { CreateAwardInput } from './schemas';

export class AwardsService {
  constructor(private readonly awardsRepository: AwardsRepository) {}

  getListBaseData(ids: number[]) {
    return this.awardsRepository.getBaseDataList(ids);
  }

  getAwardById(id: number) {
    return this.awardsRepository.getById(id);
  }

  async getListOptions() {
    const awards = await this.awardsRepository.getListOptions();

    return buildListOptions(awards);
  }

  async getNominationsListOptions(awardId: number) {
    const nominations = await this.awardsRepository.getNominationsByAward(
      awardId,
    );

    return buildListOptions(nominations);
  }

  createAward(input: CreateAwardInput) {
    return this.awardsRepository.createAward(input);
  }
}
