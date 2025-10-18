import { database } from 'src/modules/database/database.module';
import { PageContentRepository } from 'src/modules/page-content/page-content.repository';
import { PageContentService } from 'src/modules/page-content/page-content.service';

const repository = new PageContentRepository(database);
export const pageContent = new PageContentService(repository);
