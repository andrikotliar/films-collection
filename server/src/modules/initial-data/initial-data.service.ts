import { convertEnumValueToLabel } from 'src/common';
import { InitialData, InitialDataServiceDependencies } from './types';
import { TitleStyle, TitleType } from '@prisma/client';

export class InitialDataService {
  private collectionsService;
  private genresService;
  private countriesService;
  private studiosService;

  constructor(dependencies: InitialDataServiceDependencies) {
    this.collectionsService = dependencies.collectionsService;
    this.genresService = dependencies.genresService;
    this.countriesService = dependencies.countriesService;
    this.studiosService = dependencies.studiosService;
  }

  async getOptions(): Promise<InitialData> {
    const [collections, genres, countries, studios] = await Promise.all([
      this.collectionsService.getListOptions(),
      this.genresService.getListOptions(),
      this.countriesService.getListOptions(),
      this.studiosService.getListOptions(),
    ]);

    const types = this.convertEnumValuesToOption(TitleType);
    const styles = this.convertEnumValuesToOption(TitleStyle);

    return {
      options: {
        collections,
        genres,
        countries,
        studios,
        types,
        styles,
      },
    };
  }

  private convertEnumValuesToOption(enumObject: Record<string, string>) {
    return Object.values(enumObject).map((value) => ({
      value,
      label: convertEnumValueToLabel(value),
    }));
  }
}
