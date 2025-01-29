import { PrismaClient } from '@prisma/client';

export class CollectionsRepository {
  constructor(private prismaClient: PrismaClient) {}

  getCollectionById(id: number) {
    return this.prismaClient.collection.findUnique({
      where: {
        id,
      },
    });
  }

  getAll() {
    return this.prismaClient.collection.findMany({
      select: {
        id: true,
        title: true,
        category: true,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }
}
