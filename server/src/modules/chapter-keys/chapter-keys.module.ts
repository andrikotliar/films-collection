import { ChapterKeysController } from './chapter-keys.controller';
import { ChapterKeysRepository } from './chapter-keys.repository';
import { ChapterKeysService } from './chapter-keys.service';
import { createModule } from 'src/common';

export const ChapterKeysModule = createModule({
  prefix: 'chapter-keys',
  service: (app) => {
    const chapterKeysRepository = new ChapterKeysRepository(app.database);
    const service = new ChapterKeysService(chapterKeysRepository);

    return service;
  },
  controller: ChapterKeysController,
});
