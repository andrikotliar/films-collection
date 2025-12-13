import type { Route } from '~/shared';
import authRouter from '~/routes/auth.router';
import awardsRouter from '~/routes/awards.router';
import chapterKeysRouter from '~/routes/chapter-keys.router';
import collectionEventsRouter from '~/routes/collection-events.router';
import collectionsRouter from '~/routes/collections.router';
import countriesRouter from '~/routes/countries.router';
import filesRouter from '~/routes/files.router';
import filmsRouter from '~/routes/films.router';
import genresRouter from '~/routes/genres.router';
import initialDataRouter from '~/routes/initial-data.router';
import pageContentRouter from '~/routes/page-content.router';
import pendingFilmsRouter from '~/routes/pending-films.router';
import peopleRouter from '~/routes/people.router';
import studiosRouter from '~/routes/studios.router';

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
