import type { Deps } from '~/shared/types/dependencies.js';
import type { GroupedNominations } from './types.js';
import {
  PAGE_LIMITS,
  type AwardsListResponse,
  type CommonListQueryParams,
  type CreateAwardInput,
  type NominationInput,
} from '@films-collection/shared';
import { throwIfNotFound } from '~/shared/helpers/throw-if-not-found.js';
import { buildListOptions } from '~/shared/helpers/build-list-options.js';

const NEW_NOMINATION_ID = -1;

export class AwardsService {
  constructor(private readonly deps: Deps<'AwardsRepository'>) {}

  async getBaseDataList(queries: CommonListQueryParams): Promise<AwardsListResponse> {
    const { list, total } = await this.deps.AwardsRepository.getBaseDataList(queries);

    return {
      list,
      total,
      pageLimit: PAGE_LIMITS.default,
    };
  }

  getAwardById(id: number) {
    return throwIfNotFound(this.deps.AwardsRepository.getById(id));
  }

  getBaseAwardData(id: number) {
    return this.deps.AwardsRepository.getBaseData(id);
  }

  async getListOptions() {
    const awards = await this.deps.AwardsRepository.getListOptions();

    return buildListOptions(awards);
  }

  async getNominationsListOptions(awardId: number) {
    const nominations = await this.deps.AwardsRepository.getNominationsByAward(awardId);

    return buildListOptions(nominations);
  }

  createAward(input: CreateAwardInput) {
    return this.deps.AwardsRepository.createAward(input);
  }

  async deleteAward(id: number) {
    const award = await throwIfNotFound(this.getAwardById(id));

    if (award.nominations.length) {
      await this.deps.AwardsRepository.deleteNominations(
        award.nominations.map((nomination) => nomination.id),
      );
    }

    return this.deps.AwardsRepository.deleteAward(id);
  }

  async updateAward(awardId: number, input: CreateAwardInput) {
    const { nominations, ...award } = input;

    await throwIfNotFound(this.getAwardById(awardId));

    if (!nominations.length) {
      return await this.deps.AwardsRepository.updateAward(awardId, award);
    }

    const awardNominations = await this.deps.AwardsRepository.getAwardNominationIds(awardId);

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

    return await this.deps.AwardsRepository.updateAwardWithNominations({
      award,
      awardId,
      updateNominations: groupedNominations.update,
      createNominations: groupedNominations.create,
      deleteNominations: nominationIdsToDelete,
    });
  }

  createNomination(awardId: number, input: NominationInput) {
    return this.deps.AwardsRepository.createNomination(awardId, input);
  }

  getAwardsWithNominations() {
    return this.deps.AwardsRepository.getAwardsWithNominations();
  }
}
