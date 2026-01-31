import { type Deps } from '~/shared';
import { CollectionCategory, PersonRole, TitleStyle, TitleType } from '@prisma/client';
import type { CollectionsService } from '~/services/collections/collections.service';
import type { GenresService } from '~/services/genres/genres.service';
import type { CountriesService } from '~/services/countries/countries.service';
import type { StudiosService } from '~/services/studios/studios.service';
import type { CollectionEventsService } from '~/services/collection-events/collection-events.service';
import type { AwardsService } from '~/services/awards/awards.service';
import type { FilmsService } from '~/services/films';
import { convertEnumValuesToOption, type InitialDataResponse } from '@films-collection/shared';
import type { PeopleService } from '~/services/people';

export class InitialDataService {
  private readonly collectionsService: CollectionsService;
  private readonly genresService: GenresService;
  private readonly countriesService: CountriesService;
  private readonly studiosService: StudiosService;
  private readonly collectionEventsService: CollectionEventsService;
  private readonly awardsService: AwardsService;
  private readonly filmsService: FilmsService;
  private readonly peopleService: PeopleService;

  constructor(
    deps: Deps<
      | 'collectionsService'
      | 'genresService'
      | 'countriesService'
      | 'studiosService'
      | 'collectionEventsService'
      | 'awardsService'
      | 'filmsService'
      | 'peopleService'
    >,
  ) {
    this.awardsService = deps.awardsService;
    this.genresService = deps.genresService;
    this.countriesService = deps.countriesService;
    this.collectionsService = deps.collectionsService;
    this.studiosService = deps.studiosService;
    this.collectionEventsService = deps.collectionEventsService;
    this.filmsService = deps.filmsService;
    this.peopleService = deps.peopleService;
  }

  async getOptions(): Promise<InitialDataResponse> {
    const [collections, genres, countries, studios, awards, filmsTotal, selectedPeople] =
      await Promise.all([
        this.collectionsService.getListOptions(),
        this.genresService.getListOptions(),
        this.countriesService.getListOptions(),
        this.studiosService.getListOptions(),
        this.awardsService.getListOptions(),
        this.filmsService.getFilmsTotal(),
        this.peopleService.getSelectedListOptions(),
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
        selectedPeople,
      },
      events,
      filmsTotal,
    };
  }
}
