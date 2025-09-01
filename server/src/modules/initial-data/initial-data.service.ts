import { convertEnumValuesToOption } from 'src/common';
import { InitialData } from './types';
import { CollectionCategory, PersonRole, TitleStyle, TitleType } from '@prisma/client';
import type { CollectionsService } from 'src/modules/collections/collections.service';
import type { GenresService } from 'src/modules/genres/genres.service';
import type { CountriesService } from 'src/modules/countries/countries.service';
import type { StudiosService } from 'src/modules/studios/studios.service';
import type { CollectionEventsService } from 'src/modules/collection-events/collection-events.service';
import type { AwardsService } from 'src/modules/awards/awards.service';

export class InitialDataService {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly genresService: GenresService,
    private readonly countriesService: CountriesService,
    private readonly studiosService: StudiosService,
    private readonly collectionEventsService: CollectionEventsService,
    private readonly awardsService: AwardsService,
  ) {}

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
