import { FC, PropsWithChildren } from 'react';
import styles from './SearchMenuContent.module.css';
import { FilmSearchResult } from '@/types';
import { FoundFilm } from '../FoundFilm';

type SearchMenuContentProps = {
  films: FilmSearchResult[];
  onFilmOpen: VoidFunction;
};

const SearchMenuContent: FC<PropsWithChildren<SearchMenuContentProps>> = ({
  films,
  onFilmOpen,
}) => {
  const isEmpty = films.length === 0;

  if (isEmpty) {
    return (
      <div className={styles.menu}>
        <div>Not found</div>
      </div>
    );
  }

  return (
    <div className={styles.menu}>
      <div className={styles.content}>
        {films.map((film) => (
          <FoundFilm key={film._id} film={film} onFilmOpen={onFilmOpen} />
        ))}
      </div>
    </div>
  );
};

export { SearchMenuContent };
