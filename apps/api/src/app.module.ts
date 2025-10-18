import type { FastifyInstance } from 'fastify';
import { createRouter } from '~/common';
import { authRoutes } from '~/modules/auth/auth.routes';
import { awardsRoutes } from '~/modules/awards/awards.routes';
import { chapterKeysRoutes } from '~/modules/chapter-keys/chapter-keys.routes';
import { collectionEventsRoutes } from '~/modules/collection-events/collection-events.routes';
import { collectionsRoutes } from '~/modules/collections/collections.routes';
import { countriesRoutes } from '~/modules/countries/countries.routes';
import { filesRoutes } from '~/modules/files/files.routes';
import { filmsRoutes } from '~/modules/films/films.routes';
import { genresRoutes } from '~/modules/genres/genres.routes';
import { initialDataRoutes } from '~/modules/initial-data/initial-data.routes';
import { pageContentRoutes } from '~/modules/page-content/page-content.routes';
import { pendingFilmsRoutes } from '~/modules/pending-films/pending-films.routes';
import { peopleRoutes } from '~/modules/people/people.routes';
import { studiosRoutes } from '~/modules/studios/studios.routes';

const routes = [
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

export const AppModule = async (app: FastifyInstance) => {
  for (const config of routes) {
    app.register(createRouter(config.routes), { prefix: `/${config.prefix}` });
    app.log.info(`[Registered Route]: /api/${config.prefix}`);
  }
};
