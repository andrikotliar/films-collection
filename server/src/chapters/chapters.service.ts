import { ChaptersModel } from './chapters.model.js';

class ChaptersService {
  async findChapters(chaptersId: string) {
    const chaptersList = await ChaptersModel.findById(chaptersId);

    return chaptersList;
  }
}

export { ChaptersService };
