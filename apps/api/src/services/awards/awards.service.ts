import type { Prisma } from '@prisma/client';
import { buildListOptions, NotFoundException, type Deps } from '~/shared';
import type { GetByIdParams, GroupedNominations } from './types';
import type { CreateAwardInput, NominationInput } from '@films-collection/shared';

const NEW_NOMINATION_ID = -1;

export class AwardsService {
  constructor(private readonly deps: Deps<'awardsRepository'>) {}

  getBaseDataList() {
    return this.deps.awardsRepository.getBaseDataList();
  }

  getAwardById(id: number, { includeNominations }: GetByIdParams = {}) {
    return this.deps.awardsRepository.getById(id, includeNominations);
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
    const award = await this.getAwardById(id);

    if (!award) {
      throw new NotFoundException({
        message: `Award #${id} not found`,
      });
    }

    return this.deps.awardsRepository.deleteAward(id);
  }

  async updateAward(awardId: number, input: CreateAwardInput) {
    const { nominations, ...award } = input;

    const awardBeforeUpdate = await this.getAwardById(awardId);

    if (!awardBeforeUpdate) {
      throw new NotFoundException({
        message: `Award ${awardId} not found`,
      });
    }

    const updatedAwardPromise = this.deps.awardsRepository.updateAward(awardId, award);

    if (!nominations.length) {
      return Promise.resolve(updatedAwardPromise);
    }

    const promises: Prisma.PrismaPromise<any>[] = [updatedAwardPromise];

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

    if (groupedNominations.create.length) {
      const createNominationsPromise = this.deps.awardsRepository.createManyNominations(
        groupedNominations.create,
      );

      promises.push(createNominationsPromise);
    }

    if (groupedNominations.update.length) {
      const nominationPromises = groupedNominations.update.map(({ id, ...nomination }) => {
        return this.deps.awardsRepository.updateNomination(id, nomination);
      });

      promises.push(...nominationPromises);
    }

    if (nominationIdsToDelete.length) {
      const deletePromises = this.deps.awardsRepository.deleteNominations(nominationIdsToDelete);

      promises.push(deletePromises);
    }

    const [updatedAward] = await this.deps.awardsRepository.transaction(promises);

    return updatedAward;
  }

  createNomination(awardId: number, input: NominationInput) {
    return this.deps.awardsRepository.createNomination(awardId, input);
  }
}
