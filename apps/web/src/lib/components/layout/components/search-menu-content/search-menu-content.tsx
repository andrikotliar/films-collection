import styles from './styles.module.css';
import { type FilmSearchResult } from '~/lib';
import { FoundFilm } from '../found-film/found-film';

type Props = {
  films: FilmSearchResult[];
  onFilmOpen: VoidFunction;
};

export const SearchMenuContent = ({ films, onFilmOpen }: Props) => {
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
