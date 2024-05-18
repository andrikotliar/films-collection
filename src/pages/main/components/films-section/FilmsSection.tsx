import styles from './FilmsSection.module.css';
import { FilmsGrid } from '@/components';
import { useFilteredFilms } from '@/hooks';

const FilmsSection = () => {
  const { films, pagesCount } = useFilteredFilms();

  return (
    <div className={styles.filmsSection}>
      <FilmsGrid films={films} pagesCount={pagesCount} />
    </div>
  );
};

export { FilmsSection };
