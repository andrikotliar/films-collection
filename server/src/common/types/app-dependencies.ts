import { AuthController } from 'src/modules/auth/auth.controller';
import { AwardsService } from 'src/modules/awards/awards.service';
import { CollectionEventsController } from 'src/modules/collection-events/collection-events.controller';
import { CollectionEventsService } from 'src/modules/collection-events/collection-events.service';
import { CollectionsService } from 'src/modules/collections/collections.service';
import { CountriesService } from 'src/modules/countries/countries.service';
import { FilmsController } from 'src/modules/films/films.controller';
import { GenresService } from 'src/modules/genres/genres.service';
import { InitialDataController } from 'src/modules/initial-data/initial-data.controller';
import { PendingFilmsController } from 'src/modules/pending-films/pending-films.controller';
import { PeopleService } from 'src/modules/people/people.service';
import { StudiosService } from 'src/modules/studios/studios.service';
import { UsersService } from 'src/modules/users/users.service';

export type AppDependencies = {
  filmsController: FilmsController;
  usersService: UsersService;
  awardsService: AwardsService;
  collectionsService: CollectionsService;
  genresService: GenresService;
  countriesService: CountriesService;
  studiosService: StudiosService;
  peopleService: PeopleService;
  collectionEventsService: CollectionEventsService;
  authController: AuthController;
  initialDataController: InitialDataController;
  collectionEventsController: CollectionEventsController;
  pendingFilmsController: PendingFilmsController;
};
