import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout, LogoLoader } from './components';

import {
  NotFoundPage,
  RootPage,
  StatisticPage,
  AboutPage,
  FilmPage,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LogoLoader />}>
            <RootPage />
          </Suspense>
        ),
      },
      {
        path: 'film/:id',
        element: (
          <Suspense fallback={<LogoLoader />}>
            <FilmPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LogoLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'stats',
        element: (
          <Suspense fallback={<LogoLoader />}>
            <StatisticPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export { router };
