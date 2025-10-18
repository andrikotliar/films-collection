import { database } from '~/modules/database/database.module';
import { PageContentRepository } from '~/modules/page-content/page-content.repository';
import { PageContentService } from '~/modules/page-content/page-content.service';

const repository = new PageContentRepository(database);
export const pageContent = new PageContentService(repository);
