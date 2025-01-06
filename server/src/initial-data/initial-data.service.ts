import { InitialData, InitialDataServiceDependencies } from './types';

export class InitialDataService {
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
      options: {
        general: lists,
        collections,
      },
    };
  }
}
