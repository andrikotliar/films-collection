import styles from './styles.module.css';
import { type FilmSearchResult } from '~/common';
import { FoundFilm } from '../found-film/found-film';

type SearchMenuContentProps = {
  films: FilmSearchResult[];
  onFilmOpen: VoidFunction;
};

export const SearchMenuContent = ({ films, onFilmOpen }: SearchMenuContentProps) => {
  const isEmpty = films.length === 0;

  if (isEmpty) {
    return (
      <div className={styles.search_menu_content}>
        <div>Not found</div>
      </div>
    );
  }

  return (
    <div className={styles.search_menu_content}>
      <div className={styles.films_list}>
        {films.map((film) => (
          <FoundFilm key={film.id} film={film} onFilmOpen={onFilmOpen} />
        ))}
      </div>
    </div>
  );
};
