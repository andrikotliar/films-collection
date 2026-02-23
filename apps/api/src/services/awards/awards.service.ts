import { buildListOptions, throwIfNotFound, type Deps } from '~/shared';
import type { GroupedNominations } from './types';
import type { CreateAwardInput, NominationInput } from '@films-collection/shared';

const NEW_NOMINATION_ID = -1;

export class AwardsService {
  constructor(private readonly deps: Deps<'awardsRepository'>) {}

  getBaseDataList() {
    return this.deps.awardsRepository.getBaseDataList();
  }

  getAwardById(id: number) {
    return throwIfNotFound(this.deps.awardsRepository.getById(id));
  }

  getBaseAwardData(id: number) {
    return this.deps.awardsRepository.getBaseData(id);
  }

  async getListOptions() {
    const awards = await this.deps.awardsRepository.getListOptions();

    return buildListOptions(awards);
  }

  async getNominationsListOptions(awardId: number) {
    const nominations = await this.deps.awardsRepository.getNominationsByAward(awardId);

    return buildListOptions(nominations);
  }

  createAward(input: CreateAwardInput) {
    return this.deps.awardsRepository.createAward(input);
  }

  async deleteAward(id: number) {
    const award = await throwIfNotFound(this.getAwardById(id));

    if (award.nominations.length) {
      await this.deps.awardsRepository.deleteNominations(
        award.nominations.map((nomination) => nomination.id),
      );
    }

    return this.deps.awardsRepository.deleteAward(id);
  }

  async updateAward(awardId: number, input: CreateAwardInput) {
    const { nominations, ...award } = input;

    await throwIfNotFound(this.getAwardById(awardId));

    if (!nominations.length) {
      return await this.deps.awardsRepository.updateAward(awardId, award);
    }

    const awardNominations = await this.deps.awardsRepository.getAwardNominationIds(awardId);

    const nominationIds = awardNominations.map((nomination) => nomination.id);
    const inputNominationIds = nominations.map((nomination) => nomination.id);

    const nominationIdsToDelete = nominationIds.filter((id) => !inputNominationIds.includes(id));

    const groupedNominations = nominations.reduce<GroupedNominations>(
      (groups, nomination) => {
        if (nomination.id === NEW_NOMINATION_ID) {
          groups.create.push({
            title: nomination.title,
            shouldIncludeActor: nomination.shouldIncludeActor,
            awardId,
          });
        } else {
          groups.update.push(nomination);
        }

        return groups;
      },
      {
        create: [],
        update: [],
      },
    );

    return await this.deps.awardsRepository.updateAwardWithNominations({
      award,
      awardId,
      updateNominations: groupedNominations.update,
      createNominations: groupedNominations.create,
      deleteNominations: nominationIdsToDelete,
    });
  }

  createNomination(awardId: number, input: NominationInput) {
    return this.deps.awardsRepository.createNomination(awardId, input);
  }
}
