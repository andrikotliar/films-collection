import { authRoutes } from '~/routes/auth';
import { awardsRoutes } from '~/routes/awards';
import { chapterKeysRoutes } from '~/routes/chapter-keys';
import { collectionEventsRoutes } from '~/routes/collection-events';
import { collectionsRoutes } from '~/routes/collections';
import { countriesRoutes } from '~/routes/countries';
import { filesRoutes } from '~/routes/files';
import { filmsRoutes } from '~/routes/films';
import { genresRoutes } from '~/routes/genres';
import { initialDataRoutes } from '~/routes/initial-data';
import { pageContentRoutes } from '~/routes/page-content';
import { pendingFilmsRoutes } from '~/routes/pending-films';
import { peopleRoutes } from '~/routes/people';
import { studiosRoutes } from '~/routes/studios';

export const routes = [
  authRoutes,
  awardsRoutes,
  chapterKeysRoutes,
  collectionEventsRoutes,
  collectionsRoutes,
  countriesRoutes,
  filesRoutes,
  filmsRoutes,
  genresRoutes,
  initialDataRoutes,
  pageContentRoutes,
  pendingFilmsRoutes,
  peopleRoutes,
  studiosRoutes,
] as const;
