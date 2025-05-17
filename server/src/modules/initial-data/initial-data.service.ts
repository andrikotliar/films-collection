import { convertEnumValueToLabel } from 'src/common';
import { InitialData, InitialDataServiceDependencies } from './types';
import {
  CollectionCategory,
  CrewPosition,
  TitleStyle,
  TitleType,
} from '@prisma/client';

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
    const [collections, genres, countries, studios, awards] = await Promise.all(
      [
        this.collectionsService.getListOptions(),
        this.genresService.getListOptions(),
        this.countriesService.getListOptions(),
        this.studiosService.getListOptions(),
        this.awardsService.getListOptions(),
      ],
    );

    const types = this.convertEnumValuesToOption(TitleType);
    const styles = this.convertEnumValuesToOption(TitleStyle);
    const roles = this.convertEnumValuesToOption(CrewPosition);
    const collectionCategories =
      this.convertEnumValuesToOption(CollectionCategory);

    const todayEvent = await this.collectionEventsService.findTodayEvent();

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
      event: todayEvent.event,
    };
  }

  private convertEnumValuesToOption(enumObject: Record<string, string>) {
    return Object.values(enumObject).map((value) => ({
      value,
      label: convertEnumValueToLabel(value),
    }));
  }
}
