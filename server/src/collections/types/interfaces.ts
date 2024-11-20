import { Collection } from './collection';
import { GroupedCollections } from './grouped-collections';

interface ICollectionsService {
  getOneCollection(collectionId: string): Promise<Collection | null>;
  getGroupedCollections(): Promise<GroupedCollections>;
}

export { ICollectionsService };
