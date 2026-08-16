import { authRouter, AuthService } from '~/modules/auth/index.js';
import { AwardsRepository, awardsRouter, AwardsService } from '~/modules/awards/index.js';
import {
  CollectionEventsRepository,
  collectionEventsRouter,
  CollectionEventsService,
} from '~/modules/collection-events/index.js';
import {
  CollectionsRepository,
  collectionsRouter,
  CollectionsService,
} from '~/modules/collections/index.js';
import {
  CountriesRepository,
  countriesRouter,
  CountriesService,
} from '~/modules/countries/index.js';
import { filesRouter, FilesService } from '~/modules/files/index.js';
import { FilmsRepository, filmsRouter, FilmsService } from '~/modules/films/index.js';
import { GenresRepository, genresRouter, GenresService } from '~/modules/genres/index.js';
import { initialDataRouter, InitialDataService } from '~/modules/initial-data/index.js';
import { ArticlesRepository, articlesRouter, ArticlesService } from '~/modules/articles/index.js';
import { PeopleRepository, peopleRouter, PeopleService } from '~/modules/people/index.js';
import { StudiosRepository, studiosRouter, StudiosService } from '~/modules/studios/index.js';
import { UsersRepository, usersRouter, UsersService } from '~/modules/users/index.js';
import { ConfigService } from '~/modules/config/index.js';
import { StorageService } from '~/modules/storage/index.js';
import type { Router } from '~/shared/index.js';
import { AiService } from '~/modules/ai/index.js';
import { HobbiesRepository, hobbiesRouter, HobbiesService } from '~/modules/hobbies/index.js';

export const services = {
  authService: AuthService,
  awardsRepository: AwardsRepository,
  awardsService: AwardsService,
  collectionEventsRepository: CollectionEventsRepository,
  collectionEventsService: CollectionEventsService,
  collectionsRepository: CollectionsRepository,
  collectionsService: CollectionsService,
  countriesRepository: CountriesRepository,
  countriesService: CountriesService,
  filesService: FilesService,
  filmsRepository: FilmsRepository,
  filmsService: FilmsService,
  genresRepository: GenresRepository,
  genresService: GenresService,
  initialDataService: InitialDataService,
  articlesRepository: ArticlesRepository,
  articlesService: ArticlesService,
  peopleRepository: PeopleRepository,
  peopleService: PeopleService,
  studiosRepository: StudiosRepository,
  studiosService: StudiosService,
  usersRepository: UsersRepository,
  usersService: UsersService,
  configService: ConfigService,
  storageService: StorageService,
  aiService: AiService,
  hobbiesRepository: HobbiesRepository,
  hobbiesService: HobbiesService,
};

export const routers: Router[] = [
  authRouter,
  awardsRouter,
  collectionEventsRouter,
  collectionsRouter,
  countriesRouter,
  filesRouter,
  filmsRouter,
  genresRouter,
  initialDataRouter,
  articlesRouter,
  peopleRouter,
  studiosRouter,
  usersRouter,
  hobbiesRouter,
];
