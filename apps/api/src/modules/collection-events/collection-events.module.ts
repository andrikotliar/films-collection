import { CollectionEventsRepository } from '~/modules/collection-events/collection-events.repository';
import { CollectionEventsService } from '~/modules/collection-events/collection-events.service';
import { collections } from '~/modules/collections/collections.module';
import { database } from '~/modules/database/database.module';

const repository = new CollectionEventsRepository(database);
export const collectionEvents = new CollectionEventsService(repository, collections);
