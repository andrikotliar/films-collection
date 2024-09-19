import { lazy } from 'react';
import { NotFoundPage } from './404/not-found';

const RootPage = lazy(() => import('./root/root'));
const FilmPage = lazy(() => import('./film/film'));
const AboutPage = lazy(() => import('./about/about'));
const StatisticPage = lazy(() => import('./statistic/statistic'));

export { RootPage, FilmPage, AboutPage, StatisticPage, NotFoundPage };
