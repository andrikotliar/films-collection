import { type Deps } from '~/shared';
import { CollectionCategory, PersonRole, TitleStyle, TitleType } from '@prisma/client';
import { convertEnumValuesToOption, type InitialDataResponse } from '@films-collection/shared';

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
    const [collections, genres, countries, studios, awards, filmsTotal, selectedPeople] =
      await Promise.all([
        this.deps.collectionsService.getListOptions(),
        this.deps.genresService.getListOptions(),
        this.deps.countriesService.getListOptions(),
        this.deps.studiosService.getListOptions(),
        this.deps.awardsService.getListOptions(),
        this.deps.filmsService.getFilmsTotal(),
        this.deps.peopleService.getSelectedListOptions(),
      ]);

    const types = convertEnumValuesToOption(TitleType);
    const styles = convertEnumValuesToOption(TitleStyle);
    const roles = convertEnumValuesToOption(PersonRole);
    const collectionCategories = convertEnumValuesToOption(CollectionCategory);

    const events = await this.deps.collectionEventsService.findTodayEvents();

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
      events,
      filmsTotal,
    };
  }
}
