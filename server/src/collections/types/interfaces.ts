import { GroupedCollections } from './grouped-collections';

interface ICollectionsService {
  getGroupedCollections(): Promise<GroupedCollections>;
}

export { ICollectionsService };
