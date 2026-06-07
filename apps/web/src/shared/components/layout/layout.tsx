import { HeadContent, Outlet, useSearch } from '@tanstack/react-router';
import { Header } from './components';

import styles from './layout.module.css';
import { FilmDrawer } from '~/shared/components/film-drawer/film-drawer';

export const Layout = () => {
  const search = useSearch({ from: '__root__' });
  return (
    <>
      <HeadContent />
      <div className={styles.app}>
        <Header />
        <Outlet />
      </div>
      {search.filmId && <FilmDrawer filmId={search.filmId} />}
    </>
  );
};
