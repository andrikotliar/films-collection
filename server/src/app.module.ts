import type { FastifyInstance } from 'fastify';
import { createRouter } from 'src/common';
import { authRoutes } from 'src/modules/auth/auth.routes';
import { awardsRoutes } from 'src/modules/awards/awards.routes';
import { chapterKeysRoutes } from 'src/modules/chapter-keys/chapter-keys.routes';
import { collectionEventsRoutes } from 'src/modules/collection-events/collection-events.routes';
import { collectionsRoutes } from 'src/modules/collections/collections.routes';
import { countriesRoutes } from 'src/modules/countries/countries.routes';
import { filesRoutes } from 'src/modules/files/files.routes';
import { filmsRoutes } from 'src/modules/films/films.routes';
import { genresRoutes } from 'src/modules/genres/genres.routes';
import { initialDataRoutes } from 'src/modules/initial-data/initial-data.routes';
import { pageContentRoutes } from 'src/modules/page-content/page-content.routes';
import { pendingFilmsRoutes } from 'src/modules/pending-films/pending-films.routes';
import { peopleRoutes } from 'src/modules/people/people.routes';
import { studiosRoutes } from 'src/modules/studios/studios.routes';

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
