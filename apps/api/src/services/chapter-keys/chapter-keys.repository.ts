import { filmChapterKeys } from '~/database/schema';
import { getFirstValue, type Deps } from '~/shared';

export class ChapterKeysRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getAll() {
    return this.deps.db.select({ key: filmChapterKeys.key }).from(filmChapterKeys);
  }

  async create(key: string) {
    return getFirstValue(await this.deps.db.insert(filmChapterKeys).values({ key }).returning());
  }
}
