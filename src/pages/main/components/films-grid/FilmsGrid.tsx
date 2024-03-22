import styles from './FilmsGrid.module.css';
import { useFilmsContext } from '@/context';
import { Loader, Pagination } from '@/components';
import { FilmLink } from './components';

const FilmsGrid = () => {
  const { films, isFilmsLoading, pagesCount } = useFilmsContext();

  return (
    <div className={styles.gridSection}>
      {isFilmsLoading && <Loader isFullPage />}
      <div className={styles.grid}>
        {films.map((film) => (
          <FilmLink data={film} key={film.id} />
        ))}
      </div>
      {pagesCount > 1 && <Pagination count={pagesCount} />}
      {films.length === 0 && !isFilmsLoading && <p>Films not found.</p>}
    </div>
  );
};

export { FilmsGrid };
