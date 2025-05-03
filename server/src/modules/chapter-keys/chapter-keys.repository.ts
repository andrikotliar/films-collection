import { PrismaClient } from '@prisma/client';

export class ChapterKeysRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  getAll() {
    return this.databaseClient.filmChapterKey.findMany({
      select: {
        key: true,
      },
    });
  }
}
