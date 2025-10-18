import { ChapterKeysRepository } from '~/modules/chapter-keys/chapter-keys.repository';
import { ChapterKeysService } from '~/modules/chapter-keys/chapter-keys.service';
import { database } from '~/modules/database/database.module';

const repository = new ChapterKeysRepository(database);
export const chapterKeys = new ChapterKeysService(repository);
