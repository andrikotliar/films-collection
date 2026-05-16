import { filmChapterKeys } from '~/database/schema.js';
import { getFirstValue, type Deps } from '~/shared/index.js';

export class ChapterKeysRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getAll() {
    return this.deps.db.select({ key: filmChapterKeys.key }).from(filmChapterKeys);
  }

  async create(key: string) {
    return getFirstValue(this.deps.db.insert(filmChapterKeys).values({ key }).returning());
  }
}
