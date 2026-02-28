import { AuthService } from '~/modules/auth';
import { AwardsRepository, AwardsService } from '~/modules/awards';
import { ChapterKeysRepository, ChapterKeysService } from '~/modules/chapter-keys';
import { CollectionEventsRepository, CollectionEventsService } from '~/modules/collection-events';
import { CollectionsRepository, CollectionsService } from '~/modules/collections';
import { CountriesRepository, CountriesService } from '~/modules/countries';
import { FilesService } from '~/modules/files';
import { FilmsRepository, FilmsService } from '~/modules/films';
import { GenresRepository, GenresService } from '~/modules/genres';
import { InitialDataService } from '~/modules/initial-data';
import { PageContentRepository, PageContentService } from '~/modules/page-content';
import { PendingFilmsRepository, PendingFilmsService } from '~/modules/pending-films';
import { PeopleRepository, PeopleService } from '~/modules/people';
import { StudiosRepository, StudiosService } from '~/modules/studios';
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
