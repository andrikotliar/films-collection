import styles from './search-menu-content.module.css';
import { FilmSearchResult } from '@/types';
import { FoundFilm } from '../found-film/found-film';

type SearchMenuContentProps = {
  films: FilmSearchResult[];
  onFilmOpen: VoidFunction;
};

export const SearchMenuContent = ({
  films,
  onFilmOpen,
}: SearchMenuContentProps) => {
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
          <FoundFilm key={film.id} film={film} onFilmOpen={onFilmOpen} />
        ))}
      </div>
    </div>
  );
};
