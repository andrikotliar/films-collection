import { GroupedLists } from './grouped-lists';

interface IListsService {
  getGroupedLists(): Promise<GroupedLists>;
}

export { IListsService };
