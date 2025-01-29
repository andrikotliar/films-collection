import { CollectionsService } from 'src/modules/collections/collections.service';
import { CountriesService } from 'src/modules/countries/countries.repository';
import { GenresService } from 'src/modules/genres/genres.service';
import { StudiosService } from 'src/modules/studios/studios.service';

export type InitialDataServiceDependencies = {
  collectionsService: CollectionsService;
  genresService: GenresService;
  countriesService: CountriesService;
  studiosService: StudiosService;
};
