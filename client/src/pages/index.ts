import { lazy } from 'react';
import { NotFoundPage } from './404/NotFoundPage';

const RootPage = lazy(() => import('./root/RootPage'));
const FilmPage = lazy(() => import('./film/FilmPage'));
const AboutPage = lazy(() => import('./about/AboutPage'));
const StatisticPage = lazy(() => import('./statistic/statistic'));

export { RootPage, FilmPage, AboutPage, StatisticPage, NotFoundPage };
