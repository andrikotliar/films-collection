import { AuthService } from '~/services/auth';
import { AwardsRepository, AwardsService } from '~/services/awards';
import { ChapterKeysRepository, ChapterKeysService } from '~/services/chapter-keys';
import { CollectionEventsRepository, CollectionEventsService } from '~/services/collection-events';
import { CollectionsRepository, CollectionsService } from '~/services/collections';
import { CountriesRepository, CountriesService } from '~/services/countries';
import { FilesService } from '~/services/files';
import { FilmsRepository, FilmsService } from '~/services/films';
import { GenresRepository, GenresService } from '~/services/genres';
import { InitialDataService } from '~/services/initial-data';
import { PageContentRepository, PageContentService } from '~/services/page-content';
import { PendingFilmsRepository, PendingFilmsService } from '~/services/pending-films';
import { PeopleRepository, PeopleService } from '~/services/people';
import { StudiosRepository, StudiosService } from '~/services/studios';
import { UsersRepository, UsersService } from '~/services/users';

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
};
