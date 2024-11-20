import { CollectionsService } from 'src/collections/collections.service';
import { ListsService } from 'src/lists/lists.service';

type InitialDataServiceDependencies = {
  collectionsService: CollectionsService;
  listsService: ListsService;
};

export type { InitialDataServiceDependencies };
