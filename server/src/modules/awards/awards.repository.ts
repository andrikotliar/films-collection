import { PrismaClient } from '@prisma/client';

export class AwardsRepository {
  constructor(private prismaClient: PrismaClient) {}

  getById(id: number) {
    return this.prismaClient.award.findUnique({
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
    return this.prismaClient.award.findMany({
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
    return this.prismaClient.award.findMany({
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
    return this.prismaClient.nomination.findMany({
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
}
