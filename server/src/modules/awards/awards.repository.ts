import { Prisma, PrismaClient } from '@prisma/client';
import { CreateAwardInput } from './schemas';

export class AwardsRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  getById(id: number) {
    return this.databaseClient.award.findUnique({
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
      },
      where: {
        id,
      },
    });
  }

  getBaseDataList(ids: number[]) {
    return this.databaseClient.award.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
      where: {
        id: {
          in: ids,
        },
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
          data: nominations,
        },
      };
    }

    return this.databaseClient.award.create({
      data,
    });
  }
}
