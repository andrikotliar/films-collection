import { FC } from 'react';
import { FilmData } from '@/common/types';
import { FilmLink, FilmsNotFound, Pagination } from './components';
import styles from './FilmsGrid.module.css';

type Props = {
  films: FilmData[];
  pagesCount: number;
};

const FilmsGrid: FC<Props> = ({ films, pagesCount }) => {
  return (
    <div className={styles.wrapper}>
      {films.length === 0 ? (
        <FilmsNotFound />
      ) : (
        <div className={styles.grid}>
          {films.map((film) => (
            <FilmLink data={film} key={film.id} />
          ))}
        </div>
      )}
      {pagesCount > 1 && <Pagination count={pagesCount} />}
    </div>
  );
};

export { FilmsGrid };
