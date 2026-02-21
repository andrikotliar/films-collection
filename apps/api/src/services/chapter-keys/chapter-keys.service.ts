import { type Deps, throwIfNotFound } from '~/shared';
import type { CreateChapterKeyInput, ListOption } from '@films-collection/shared';

export class ChapterKeysService {
  constructor(private readonly deps: Deps<'chapterKeysRepository'>) {}

  async getListOptions(): Promise<ListOption<string>[]> {
    const keys = await this.deps.chapterKeysRepository.getAll();

    return keys.map((item) => ({
      label: item.key,
      value: item.key,
    }));
  }

  addKey({ key }: CreateChapterKeyInput) {
    return throwIfNotFound(this.deps.chapterKeysRepository.create(key));
  }
}
