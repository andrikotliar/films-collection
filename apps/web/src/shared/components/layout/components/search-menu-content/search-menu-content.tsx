import styles from './search-menu-content.module.css';
import { FoundFilm } from '../found-film/found-film';
import type { ApiResponse } from '~/shared/types';
import type { api } from '~/shared/services';

type SearchMenuContentProps = {
  films: ApiResponse<typeof api.films.search.list>;
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
