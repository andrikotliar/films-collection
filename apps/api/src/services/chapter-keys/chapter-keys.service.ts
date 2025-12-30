import type { Deps } from '~/shared';
import type { ChapterKeysRepository } from './chapter-keys.repository';
import type { CreateChapterKeyInput, ListOption } from '@films-collection/shared';

export class ChapterKeysService {
  private readonly chapterKeysRepository: ChapterKeysRepository;

  constructor(deps: Deps<'chapterKeysRepository'>) {
    this.chapterKeysRepository = deps.chapterKeysRepository;
  }

  async getListOptions(): Promise<ListOption<string>[]> {
    const keys = await this.chapterKeysRepository.getAll();

    return keys.map((item) => ({
      label: item.key,
      value: item.key,
    }));
  }

  addKey({ key }: CreateChapterKeyInput) {
    return this.chapterKeysRepository.create(key);
  }
}
