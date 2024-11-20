import { ListsModel } from './lists.model';
import { IListsService, GroupedLists } from './types';

class ListsService implements IListsService {
  private listsModel;

  constructor(listsModel: typeof ListsModel) {
    this.listsModel = listsModel;
  }

  async getGroupedLists(): Promise<GroupedLists> {
    const lists = await this.listsModel.find();

    return lists.reduce((groupedLists, list) => {
      groupedLists[list.type] = list.values;

      return groupedLists;
    }, {} as GroupedLists);
  }
}

export { ListsService };
