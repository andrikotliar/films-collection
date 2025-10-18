import { buildListOptions, NotFoundException } from 'src/common';
import { AwardsRepository } from './awards.repository';
import { AwardInput } from './schemas';
import { GetByIdParams, GroupedNominations } from './types';
import { Prisma } from '@prisma/client';

const NEW_NOMINATION_ID = -1;

export class AwardsService {
  constructor(private readonly awardsRepository: AwardsRepository) {}

  getBaseDataList() {
    return this.awardsRepository.getBaseDataList();
  }

  getAwardById(id: number, { includeNominations }: GetByIdParams = {}) {
    return this.awardsRepository.getById(id, includeNominations);
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

  createAward(input: AwardInput) {
    return this.awardsRepository.createAward(input);
  }

  async deleteAward(id: number) {
    const award = await this.getAwardById(id);

    if (!award) {
      throw new NotFoundException({
        message: `Award #${id} not found`,
      });
    }

    return this.awardsRepository.deleteAward(id);
  }

  async updateAward(awardId: number, input: AwardInput) {
    const { nominations, ...award } = input;

    const awardBeforeUpdate = await this.getAwardById(awardId);

    if (!awardBeforeUpdate) {
      throw new NotFoundException({
        message: `Award ${awardId} not found`,
      });
    }

    const updatedAwardPromise = this.awardsRepository.updateAward(
      awardId,
      award,
    );

    if (!nominations.length) {
      return Promise.resolve(updatedAwardPromise);
    }

    const promises: Prisma.PrismaPromise<any>[] = [updatedAwardPromise];

    const awardNominations = await this.awardsRepository.getAwardNominationIds(
      awardId,
    );

    const nominationIds = awardNominations.map((nomination) => nomination.id);
    const inputNominationIds = nominations.map((nomination) => nomination.id);

    const nominationIdsToDelete = nominationIds.filter(
      (id) => !inputNominationIds.includes(id),
    );

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
      const createNominationsPromise =
        this.awardsRepository.createManyNominations(groupedNominations.create);

      promises.push(createNominationsPromise);
    }

    if (groupedNominations.update.length) {
      const nominationPromises = groupedNominations.update.map(
        ({ id, ...nomination }) => {
          return this.awardsRepository.updateNomination(id, nomination);
        },
      );

      promises.push(...nominationPromises);
    }

    if (nominationIdsToDelete.length) {
      const deletePromises = this.awardsRepository.deleteNominations(
        nominationIdsToDelete,
      );

      promises.push(deletePromises);
    }

    const [updatedAward] = await this.awardsRepository.transaction(promises);

    return updatedAward;
  }
}
