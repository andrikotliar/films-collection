import { CollectionsRepository } from '~/modules/collections/collections.repository';
import { CollectionsService } from '~/modules/collections/collections.service';
import { database } from '~/modules/database/database.module';

const repository = new CollectionsRepository(database);
export const collections = new CollectionsService(repository);
