import styles from './header.module.css';
import { Link, useLocation } from '@tanstack/react-router';
import { FilmsSearch } from '../films-search/films-search';
import { AppMenu } from '../app-menu/app-menu';
import { Logo } from '~/shared/components/logo/logo';

export const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.left_column}>
          <Link
            to="/"
            search={location.pathname === '/' ? location.search : undefined}
            className={styles.logo_wrapper}
          >
            <Logo />
          </Link>
        </div>
        <div className={styles.search_wrapper}>
          <FilmsSearch />
        </div>
        <AppMenu />
      </div>
    </header>
  );
};
