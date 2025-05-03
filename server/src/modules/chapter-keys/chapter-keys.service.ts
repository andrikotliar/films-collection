import { ListOption } from 'src/common';
import { ChapterKeysRepository } from './chapter-keys.repository';

export class ChapterKeysService {
  constructor(private readonly chapterKeysRepository: ChapterKeysRepository) {}

  async getListOptions(): Promise<ListOption<string>[]> {
    const keys = await this.chapterKeysRepository.getAll();

    return keys.map((item) => ({
      label: item.key,
      value: item.key,
    }));
  }
}
