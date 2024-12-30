import { CollectionsService } from 'src/collections/collections.service';
import { ListsService } from 'src/lists/lists.service';

export type InitialDataServiceDependencies = {
  collectionsService: CollectionsService;
  listsService: ListsService;
};
