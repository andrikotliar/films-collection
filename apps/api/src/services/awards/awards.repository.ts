import type { Prisma } from '@prisma/client';
import type { CreateAwardInput, UpdateAwardInput } from '@films-collection/shared';
import { BaseRepository, type Deps } from '~/shared';

export class AwardsRepository extends BaseRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {
    super(deps.databaseService);
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

    return this.deps.databaseService.award.findUnique({
      select,
      where: {
        id,
      },
    });
  }

  getBaseData(awardId: number) {
    return this.deps.databaseService.award.findUnique({
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
    return this.deps.databaseService.award.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  getListOptions() {
    return this.deps.databaseService.award.findMany({
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
    return this.deps.databaseService.nomination.findMany({
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

    return this.deps.databaseService.award.create({
      data,
    });
  }

  updateAward(id: number, input: Omit<UpdateAwardInput, 'nominations'>) {
    return this.deps.databaseService.award.update({
      where: {
        id,
      },
      data: input,
    });
  }

  createManyNominations(inputs: Prisma.NominationUncheckedCreateInput[]) {
    return this.deps.databaseService.nomination.createMany({
      data: inputs,
    });
  }

  updateNomination(id: number, input: Prisma.NominationUpdateInput) {
    return this.deps.databaseService.nomination.update({
      where: {
        id,
      },
      data: input,
    });
  }

  deleteAward(id: number) {
    return this.deps.databaseService.award.delete({
      where: {
        id,
      },
    });
  }

  deleteNominations(ids: number[]) {
    return this.deps.databaseService.nomination.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  getAwardNominationIds(awardId: number) {
    return this.deps.databaseService.nomination.findMany({
      select: {
        id: true,
      },
      where: {
        awardId,
      },
    });
  }
}
