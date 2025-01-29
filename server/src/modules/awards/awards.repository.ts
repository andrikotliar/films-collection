import { PrismaClient } from '@prisma/client';

export class AwardsRepository {
  constructor(private prismaClient: PrismaClient) {}

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
}
