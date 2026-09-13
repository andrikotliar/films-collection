import styles from './selected-film.module.css';
import { Link } from '@tanstack/react-router';
import { getExternalImageUrl, Image, type api, type ApiResponse } from '~/shared';

type SelectedFilmProps = {
  data: ApiResponse<typeof api.films.getFilmByCollectionName>;
};

export const SelectedFilm = ({ data }: SelectedFilmProps) => {
  return (
    <Link to="/about" search={{ filmId: data.id }} className={styles.film}>
      <h2 className={styles.label}>Selected film</h2>
      <Image src={getExternalImageUrl(data.poster)} />
      <div className={styles.badge}>
        <div className={styles.badge_label}>Top 10</div>
        <div className={styles.badge_num}>{data.order}</div>
      </div>
    </Link>
  );
};
