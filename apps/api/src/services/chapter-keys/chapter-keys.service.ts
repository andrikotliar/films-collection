import { ListOption, type Deps } from '~/common';
import { ChapterKeysRepository } from './chapter-keys.repository';
import { CreateChapterKeyPayload } from '~/services/chapter-keys/schemas';

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

  addKey({ key }: CreateChapterKeyPayload) {
    return this.chapterKeysRepository.create(key);
  }
}
