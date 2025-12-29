import { convertEnumValuesToOption, type Deps } from '~/shared';
import { InitialData } from './types';
import { CollectionCategory, PersonRole, TitleStyle, TitleType } from '@prisma/client';
import type { CollectionsService } from '~/services/collections/collections.service';
import type { GenresService } from '~/services/genres/genres.service';
import type { CountriesService } from '~/services/countries/countries.service';
import type { StudiosService } from '~/services/studios/studios.service';
import type { CollectionEventsService } from '~/services/collection-events/collection-events.service';
import type { AwardsService } from '~/services/awards/awards.service';
import type { FilmsService } from '~/services/films';

export class InitialDataService {
  private readonly collectionsService: CollectionsService;
  private readonly genresService: GenresService;
  private readonly countriesService: CountriesService;
  private readonly studiosService: StudiosService;
  private readonly collectionEventsService: CollectionEventsService;
  private readonly awardsService: AwardsService;
  private readonly filmsService: FilmsService;

  constructor(
    deps: Deps<
      | 'collectionsService'
      | 'genresService'
      | 'countriesService'
      | 'studiosService'
      | 'collectionEventsService'
      | 'awardsService'
      | 'filmsService'
    >,
  ) {
    this.awardsService = deps.awardsService;
    this.genresService = deps.genresService;
    this.countriesService = deps.countriesService;
    this.collectionsService = deps.collectionsService;
    this.studiosService = deps.studiosService;
    this.collectionEventsService = deps.collectionEventsService;
    this.filmsService = deps.filmsService;
  }

  async getOptions(): Promise<InitialData> {
    const [collections, genres, countries, studios, awards, filmsTotal] = await Promise.all([
      this.collectionsService.getListOptions(),
      this.genresService.getListOptions(),
      this.countriesService.getListOptions(),
      this.studiosService.getListOptions(),
      this.awardsService.getListOptions(),
      this.filmsService.getFilmsTotal(),
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
      filmsTotal,
    };
  }
}
