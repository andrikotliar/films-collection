import { ChaptersModel } from './chapters.model';
import { IChaptersService } from './types';

class ChaptersService implements IChaptersService {
  private chaptersModel;

  constructor(chaptersModel: typeof ChaptersModel) {
    this.chaptersModel = chaptersModel;
  }

  async findChapters(chaptersId: string) {
    const chaptersList = await this.chaptersModel.findById(chaptersId).lean();

    return chaptersList;
  }
}

export { ChaptersService };
