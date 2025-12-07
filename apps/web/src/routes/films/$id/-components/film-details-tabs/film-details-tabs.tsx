import { Link, useLocation } from '@tanstack/react-router';
import type { FileRoutesByTo } from '~/routeTree.gen';
import styles from './film-details-tabs.module.css';
import clsx from 'clsx';

export type FilmDetailsTab = {
  title: string;
  route: keyof FileRoutesByTo;
  isVisible?: boolean;
};

type FilmDetailsTabs = {
  config: FilmDetailsTab[];
  filmId: number;
};

export const FilmDetailsTabs = ({ config, filmId }: FilmDetailsTabs) => {
  const location = useLocation();

  const isActive = (route: string) => {
    return location.pathname === route.replace('$id', filmId.toString());
  };

  const availableTabs = config.filter((item) => item.isVisible !== false);

  if (availableTabs.length < 2) {
    return null;
  }

  return (
    <div className={styles.tabs}>
      {availableTabs.map((item) => (
        <Link
          to={item.route}
          params={{ id: filmId }}
          key={item.route}
          className={clsx(styles.tab_link, isActive(item.route) && styles.tab_link_active)}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};
