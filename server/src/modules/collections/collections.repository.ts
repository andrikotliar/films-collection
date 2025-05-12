import { PrismaClient } from '@prisma/client';

export class CollectionsRepository {
  constructor(private databaseClient: PrismaClient) {}

  getCollectionById(id: number) {
    return this.databaseClient.collection.findUnique({
      where: {
        id,
      },
    });
  }

  getAll() {
    return this.databaseClient.collection.findMany({
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
