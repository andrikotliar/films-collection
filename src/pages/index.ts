import { lazy } from 'react';

const MainPage = lazy(() => import('./main/MainPage'));
const FilmPage = lazy(() => import('./film/FilmPage'));
const AboutPage = lazy(() => import('./about/AboutPage'));
const StatisticPage = lazy(() => import('./statistic/StatisticPage'));

export { MainPage, FilmPage, AboutPage, StatisticPage };
