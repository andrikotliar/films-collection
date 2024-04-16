import { FC } from 'react';
import { FilmData } from '@/common/types';
import { FilmLink, Pagination } from './components';
import { Loader } from '../loader/Loader';
import styles from './FilmsGrid.module.css';

type Props = {
  films: FilmData[];
  isLoading?: boolean;
  pagesCount: number;
};

const FilmsGrid: FC<Props> = ({ films, isLoading = false, pagesCount }) => {
  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader isFullPage />}
      <div className={styles.grid}>
        {films.map((film) => (
          <FilmLink data={film} key={film.id} />
        ))}
      </div>
      {pagesCount > 1 && <Pagination count={pagesCount} />}
      {films.length === 0 && !isLoading && <p>Films not found.</p>}
    </div>
  );
};

export { FilmsGrid };
