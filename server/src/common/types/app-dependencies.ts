import { AuthService } from 'src/modules/auth/auth.service';
import { AwardsService } from 'src/modules/awards/awards.service';
import { CollectionEventsService } from 'src/modules/collection-events/collection-events.service';
import { CollectionsService } from 'src/modules/collections/collections.service';
import { CountriesService } from 'src/modules/countries/countries.service';
import { FilesService } from 'src/modules/files/files.service';
import { FilmsService } from 'src/modules/films/films.service';
import { GenresService } from 'src/modules/genres/genres.service';
import { InitialDataService } from 'src/modules/initial-data/initial-data.service';
import { PendingFilmsService } from 'src/modules/pending-films/pending-films.service';
import { PeopleService } from 'src/modules/people/people.service';
import { StudiosService } from 'src/modules/studios/studios.service';
import { UsersService } from 'src/modules/users/users.service';

export type AppDependencies = {
  authService: AuthService;
  usersService: UsersService;
  awardsService: AwardsService;
  collectionsService: CollectionsService;
  genresService: GenresService;
  countriesService: CountriesService;
  studiosService: StudiosService;
  peopleService: PeopleService;
  collectionEventsService: CollectionEventsService;
  filmsService: FilmsService;
  filesService: FilesService;
  initialDataService: InitialDataService;
  pendingFilmsService: PendingFilmsService;
};
