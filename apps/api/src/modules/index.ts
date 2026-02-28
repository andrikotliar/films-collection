import type { Route } from '~/shared';
import { authRouter, AuthService } from '~/modules/auth';
import { AwardsRepository, awardsRouter, AwardsService } from '~/modules/awards';
import {
  ChapterKeysRepository,
  chapterKeysRouter,
  ChapterKeysService,
} from '~/modules/chapter-keys';
import {
  CollectionEventsRepository,
  collectionEventsRouter,
  CollectionEventsService,
} from '~/modules/collection-events';
import {
  CollectionsRepository,
  collectionsRouter,
  CollectionsService,
} from '~/modules/collections';
import { CountriesRepository, countriesRouter, CountriesService } from '~/modules/countries';
import { filesRouter, FilesService } from '~/modules/files';
import { FilmsRepository, filmsRouter, FilmsService } from '~/modules/films';
import { GenresRepository, genresRouter, GenresService } from '~/modules/genres';
import { initialDataRouter, InitialDataService } from '~/modules/initial-data';
import {
  PageContentRepository,
  pageContentRouter,
  PageContentService,
} from '~/modules/page-content';
import {
  PendingFilmsRepository,
  pendingFilmsRouter,
  PendingFilmsService,
} from '~/modules/pending-films';
import { PeopleRepository, peopleRouter, PeopleService } from '~/modules/people';
import { StudiosRepository, studiosRouter, StudiosService } from '~/modules/studios';
import { UsersRepository, UsersService } from '~/modules/users';
import { ConfigService } from '~/modules/config';

export const services = {
  authService: AuthService,
  awardsRepository: AwardsRepository,
  awardsService: AwardsService,
  chapterKeysRepository: ChapterKeysRepository,
  chapterKeysService: ChapterKeysService,
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
  pageContentRepository: PageContentRepository,
  pageContentService: PageContentService,
  pendingFilmsRepository: PendingFilmsRepository,
  pendingFilmsService: PendingFilmsService,
  peopleRepository: PeopleRepository,
  peopleService: PeopleService,
  studiosRepository: StudiosRepository,
  studiosService: StudiosService,
  usersRepository: UsersRepository,
  usersService: UsersService,
  configService: ConfigService,
};

export const routers: Record<string, Route[]> = {
  auth: authRouter,
  awards: awardsRouter,
  chapterKeys: chapterKeysRouter,
  collectionEvents: collectionEventsRouter,
  collections: collectionsRouter,
  countries: countriesRouter,
  files: filesRouter,
  films: filmsRouter,
  genres: genresRouter,
  initialData: initialDataRouter,
  pageContent: pageContentRouter,
  pendingFilms: pendingFilmsRouter,
  people: peopleRouter,
  studios: studiosRouter,
};
