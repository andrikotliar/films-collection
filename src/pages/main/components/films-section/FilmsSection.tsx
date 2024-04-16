import styles from './FilmsSection.module.css';
import { useFilmsContext } from '@/context';
import { FilmsGrid } from '@/components';

const FilmsSection = () => {
  const { films, isFilmsLoading, pagesCount } = useFilmsContext();

  return (
    <div className={styles.filmsSection}>
      <FilmsGrid
        films={films}
        isLoading={isFilmsLoading}
        pagesCount={pagesCount}
      />
    </div>
  );
};

export { FilmsSection };
