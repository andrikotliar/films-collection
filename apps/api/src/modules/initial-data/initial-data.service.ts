import { type Deps } from '~/shared';
import { convertEnumValuesToOption, type InitialDataResponse } from '@films-collection/shared';
import { collectionCategory, personRole, titleStyle, titleType } from '~/database/schema';

export class InitialDataService {
  constructor(
    private readonly deps: Deps<
      | 'collectionsService'
      | 'genresService'
      | 'countriesService'
      | 'studiosService'
      | 'collectionEventsService'
      | 'awardsService'
      | 'filmsService'
      | 'peopleService'
    >,
  ) {}

  async getOptions(): Promise<InitialDataResponse> {
    const [collections, genres, countries, studios, awards, selectedPeople] = await Promise.all([
      this.deps.collectionsService.getListOptions(),
      this.deps.genresService.getListOptions(),
      this.deps.countriesService.getListOptions(),
      this.deps.studiosService.getListOptions(),
      this.deps.awardsService.getListOptions(),
      this.deps.peopleService.getSelectedListOptions(),
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
