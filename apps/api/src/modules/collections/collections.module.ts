import { CollectionsRepository } from 'src/modules/collections/collections.repository';
import { CollectionsService } from 'src/modules/collections/collections.service';
import { database } from 'src/modules/database/database.module';

const repository = new CollectionsRepository(database);
export const collections = new CollectionsService(repository);
