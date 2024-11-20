import {
  IInitialDataService,
  InitialData,
  InitialDataServiceDependencies,
} from './types';

class InitialDataService implements IInitialDataService {
  private collectionsService;
  private listsService;

  constructor(dependencies: InitialDataServiceDependencies) {
    this.collectionsService = dependencies.collectionsService;
    this.listsService = dependencies.listsService;
  }

  async getConfig(): Promise<InitialData> {
    const collections = await this.collectionsService.getGroupedCollections();
    const lists = await this.listsService.getGroupedLists();

    return {
      filters: {
        general: lists,
        collections,
      },
    };
  }
}

export { InitialDataService };
