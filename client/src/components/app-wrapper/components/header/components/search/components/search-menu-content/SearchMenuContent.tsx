import { FC, PropsWithChildren } from 'react';
import styles from './SearchMenuContent.module.css';
import { FilmData } from '@/types';
import { FoundFilm } from '../found-film/FoundFilm';

type SearchMenuContentProps = {
  films: FilmData[];
  onFilmOpen: VoidFunction;
};

const SearchMenuContent: FC<PropsWithChildren<SearchMenuContentProps>> = ({
  films,
  onFilmOpen,
}) => {
  const isEmpty = films.length === 0;

  return (
    <div className={styles.wrapper}>
      {!isEmpty ? (
        <div className={styles.content}>
          {films.map((film) => (
            <FoundFilm key={film._id} film={film} onFilmOpen={onFilmOpen} />
          ))}
        </div>
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
};

export { SearchMenuContent };
