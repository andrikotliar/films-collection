import type { DatabaseClient, Deps } from '~/shared';

export class ChapterKeysRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

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
