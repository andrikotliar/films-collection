import { lazy } from 'react';

const MainPage = lazy(() => import('./Main/MainPage'));
const FilmPage = lazy(() => import('./Film/FilmPage'));
const AboutPage = lazy(() => import('./About/AboutPage'));
const StatisticPage = lazy(() => import('./Statistic/StatisticPage'));

export { MainPage, FilmPage, AboutPage, StatisticPage };
