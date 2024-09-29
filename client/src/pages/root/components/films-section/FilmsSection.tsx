import { useContext } from 'react';
import { FilmsGrid, Loader, Pagination } from '@/components';
import { FilmsListContext } from '../../context/films-list-context';
import { FilmsNotFound } from './components';
import styles from './FilmsSection.module.css';

const FilmsSection = () => {
  const { data, isLoading } = useContext(FilmsListContext);

  if (isLoading) {
    return (
      <div className={styles.filmsSection}>
        <Loader />
      </div>
    );
  }

  if (!data?.films.length) {
    return (
      <div className={styles.filmsSection}>
        <FilmsNotFound />
      </div>
    );
  }

  return (
    <div className={styles.filmsSection}>
      <FilmsGrid films={data.films} />
      <div className={styles.paginationWrapper}>
        <Pagination total={data.total} />
      </div>
    </div>
  );
};

export { FilmsSection };
