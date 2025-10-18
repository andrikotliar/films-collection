import { ListOption } from '~/common';
import { ChapterKeysRepository } from './chapter-keys.repository';
import { CreateChapterKeyPayload } from '~/modules/chapter-keys/schemas';

export class ChapterKeysService {
  constructor(private readonly chapterKeysRepository: ChapterKeysRepository) {}

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
