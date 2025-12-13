import type { Route } from '~/shared';
import authRouter from '~/routers/auth.router';
import awardsRouter from '~/routers/awards.router';
import chapterKeysRouter from '~/routers/chapter-keys.router';
import collectionEventsRouter from '~/routers/collection-events.router';
import collectionsRouter from '~/routers/collections.router';
import countriesRouter from '~/routers/countries.router';
import filesRouter from '~/routers/files.router';
import filmsRouter from '~/routers/films.router';
import genresRouter from '~/routers/genres.router';
import initialDataRouter from '~/routers/initial-data.router';
import pageContentRouter from '~/routers/page-content.router';
import pendingFilmsRouter from '~/routers/pending-films.router';
import peopleRouter from '~/routers/people.router';
import studiosRouter from '~/routers/studios.router';

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
