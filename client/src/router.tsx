import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components';

import { RootPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <RootPage />,
      },
      {
        path: 'film/:id',
        lazy: async () => {
          const { FilmPage } = await import('./pages/Film');

          return { Component: FilmPage };
        },
      },
      {
        path: 'about',
        lazy: async () => {
          const { AboutPage } = await import('./pages/About');

          return { Component: AboutPage };
        },
      },
      {
        path: 'stats',
        lazy: async () => {
          const { StatisticPage } = await import('./pages/Statistic');

          return { Component: StatisticPage };
        },
      },
    ],
  },
]);

export { router };
