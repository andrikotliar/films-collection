import { CollectionEventsRepository } from 'src/modules/collection-events/collection-events.repository';
import { CollectionEventsService } from 'src/modules/collection-events/collection-events.service';
import { collections } from 'src/modules/collections/collections.module';
import { database } from 'src/modules/database/database.module';

const repository = new CollectionEventsRepository(database);
export const collectionEvents = new CollectionEventsService(repository, collections);
