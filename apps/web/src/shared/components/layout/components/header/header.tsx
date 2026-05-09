import styles from './header.module.css';
import { Link } from '@tanstack/react-router';
import { FilmsSearch } from '../films-search/films-search';
import { Logo } from '~/shared/components/logo/logo';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo_wrapper}>
        <Logo />
      </Link>
      <div className={styles.search_wrapper}>
        <FilmsSearch />
      </div>
    </header>
  );
};
