import { convertEnumValuesToOption } from 'src/common';
import { InitialData, InitialDataServiceDependencies } from './types';
import { CollectionCategory, PersonRole, TitleStyle, TitleType } from '@prisma/client';

export class InitialDataService {
  private collectionsService;
  private genresService;
  private countriesService;
  private studiosService;
  private collectionEventsService;
  private awardsService;

  constructor(dependencies: InitialDataServiceDependencies) {
    this.collectionsService = dependencies.collectionsService;
    this.genresService = dependencies.genresService;
    this.countriesService = dependencies.countriesService;
    this.studiosService = dependencies.studiosService;
    this.collectionEventsService = dependencies.collectionEventsService;
    this.awardsService = dependencies.awardsService;
  }

  async getOptions(): Promise<InitialData> {
    const [collections, genres, countries, studios, awards] = await Promise.all([
      this.collectionsService.getListOptions(),
      this.genresService.getListOptions(),
      this.countriesService.getListOptions(),
      this.studiosService.getListOptions(),
      this.awardsService.getListOptions(),
    ]);

    const types = convertEnumValuesToOption(TitleType);
    const styles = convertEnumValuesToOption(TitleStyle);
    const roles = convertEnumValuesToOption(PersonRole);
    const collectionCategories = convertEnumValuesToOption(CollectionCategory);

    const events = await this.collectionEventsService.findTodayEvents();

    return {
      options: {
        collections,
        genres,
        countries,
        studios,
        types,
        styles,
        roles,
        awards,
        collectionCategories,
      },
      events,
    };
  }
}
