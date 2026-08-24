import { convertEnumValuesToOption, type InitialDataResponse } from '@films-collection/shared';
import { collectionCategory, personRole, titleStyle, titleType } from '~/database/schema.js';
import type { Deps } from '~/shared/types/deps.js';

export class InitialDataService {
  constructor(
    private readonly deps: Deps<
      | 'CollectionsService'
      | 'GenresService'
      | 'CountriesService'
      | 'StudiosService'
      | 'CollectionEventsService'
      | 'AwardsService'
      | 'FilmsService'
      | 'PeopleService'
    >,
  ) {}

  async getOptions(): Promise<InitialDataResponse> {
    const [collections, genres, countries, studios, awards, selectedPeople] = await Promise.all([
      this.deps.CollectionsService.getListOptions(),
      this.deps.GenresService.getListOptions(),
      this.deps.CountriesService.getListOptions(),
      this.deps.StudiosService.getListOptions(),
      this.deps.AwardsService.getListOptions(),
      this.deps.PeopleService.getSelectedListOptions(),
    ]);

    const types = convertEnumValuesToOption(titleType.enumValues);
    const styles = convertEnumValuesToOption(titleStyle.enumValues);
    const roles = convertEnumValuesToOption(personRole.enumValues);
    const collectionCategories = convertEnumValuesToOption(collectionCategory.enumValues);

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
        selectedPeople,
      },
    };
  }
}
