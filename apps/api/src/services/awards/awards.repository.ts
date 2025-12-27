import type { Prisma } from '@prisma/client';
import type { CreateAwardInput, UpdateAwardInput } from '@films-collection/shared';
import { BaseRepository, type DatabaseClient, type Deps } from '~/shared';

export class AwardsRepository extends BaseRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    super(deps.databaseService);
    this.databaseClient = deps.databaseService;
  }

  getById(id: number, shouldIncludeNominations = false) {
    const select: Prisma.AwardFindUniqueArgs['select'] = {
      id: true,
      title: true,
      description: true,
    };

    if (shouldIncludeNominations) {
      select.nominations = {
        orderBy: {
          title: 'asc',
        },
      };
    }

    return this.databaseClient.award.findUnique({
      select,
      where: {
        id,
      },
    });
  }

  getBaseData(awardId: number) {
    return this.databaseClient.award.findUnique({
      where: {
        id: awardId,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  }

  getBaseDataList() {
    return this.databaseClient.award.findMany({
      select: {
        id: true,
        title: true,
      },
    });
  }

  getListOptions() {
    return this.databaseClient.award.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  getNominationsByAward(awardId: number) {
    return this.databaseClient.nomination.findMany({
      select: {
        id: true,
        title: true,
        shouldIncludeActor: true,
      },
      where: {
        awardId,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  createAward({ nominations, ...award }: CreateAwardInput) {
    const data: Prisma.AwardCreateInput = { ...award };

    if (nominations.length) {
      data.nominations = {
        createMany: {
          data: nominations.map((nomination) => ({
            title: nomination.title,
            shouldIncludeActor: nomination.shouldIncludeActor,
          })),
        },
      };
    }

    return this.databaseClient.award.create({
      data,
    });
  }

  updateAward(id: number, input: Omit<UpdateAwardInput, 'nominations'>) {
    return this.databaseClient.award.update({
      where: {
        id,
      },
      data: input,
    });
  }

  createManyNominations(inputs: Prisma.NominationUncheckedCreateInput[]) {
    return this.databaseClient.nomination.createMany({
      data: inputs,
    });
  }

  updateNomination(id: number, input: Prisma.NominationUpdateInput) {
    return this.databaseClient.nomination.update({
      where: {
        id,
      },
      data: input,
    });
  }

  deleteAward(id: number) {
    return this.databaseClient.award.delete({
      where: {
        id,
      },
    });
  }

  deleteNominations(ids: number[]) {
    return this.databaseClient.nomination.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  getAwardNominationIds(awardId: number) {
    return this.databaseClient.nomination.findMany({
      select: {
        id: true,
      },
      where: {
        awardId,
      },
    });
  }
}
