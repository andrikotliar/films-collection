import { ChapterKeysRepository } from 'src/modules/chapter-keys/chapter-keys.repository';
import { ChapterKeysService } from 'src/modules/chapter-keys/chapter-keys.service';
import { database } from 'src/modules/database/database.module';

const repository = new ChapterKeysRepository(database);
export const chapterKeys = new ChapterKeysService(repository);
