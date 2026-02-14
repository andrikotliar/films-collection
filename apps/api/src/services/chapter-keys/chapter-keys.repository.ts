import type { Deps } from '~/shared';

export class ChapterKeysRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {}

  getAll() {
    return this.deps.databaseService.filmChapterKey.findMany({
      select: {
        key: true,
      },
    });
  }

  create(key: string) {
    return this.deps.databaseService.filmChapterKey.create({
      data: {
        key,
      },
    });
  }
}
