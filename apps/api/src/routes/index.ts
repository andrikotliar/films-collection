import { authRoutes } from '~/routes/auth.router';
import { awardsRoutes } from '~/routes/awards.router';
import { chapterKeysRoutes } from '~/routes/chapter-keys.router';
import { collectionEventsRoutes } from '~/routes/collection-events.router';
import { collectionsRoutes } from '~/routes/collections.router';
import { countriesRoutes } from '~/routes/countries.router';
import { filesRoutes } from '~/routes/files.router';
import { filmsRoutes } from '~/routes/films.router';
import { genresRoutes } from '~/routes/genres.router';
import { initialDataRoutes } from '~/routes/initial-data.router';
import { pageContentRoutes } from '~/routes/page-content.router';
import { pendingFilmsRoutes } from '~/routes/pending-films.router';
import { peopleRoutes } from '~/routes/people.router';
import { studiosRoutes } from '~/routes/studios.router';

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
