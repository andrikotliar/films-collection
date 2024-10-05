import { lazy } from 'react';
import NotFoundPage from './NotFound/NotFoundPage';

const RootPage = lazy(() => import('./Root/RootPage'));
const FilmPage = lazy(() => import('./Film/FilmPage'));
const AboutPage = lazy(() => import('./About/AboutPage'));
const StatisticPage = lazy(() => import('./Statistic/Statistic'));

export { RootPage, FilmPage, AboutPage, StatisticPage, NotFoundPage };
