import type { DatabaseClient } from '~/common';

export class ChapterKeysRepository {
  constructor(private readonly databaseClient: DatabaseClient) {}

  getAll() {
    return this.databaseClient.filmChapterKey.findMany({
      select: {
        key: true,
      },
    });
  }

  create(key: string) {
    return this.databaseClient.filmChapterKey.create({
      data: {
        key,
      },
    });
  }
}
