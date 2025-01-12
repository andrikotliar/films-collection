import { Image, ScrollableWrapper } from '@/components';
import styles from './RandomFilms.module.css';
import { Link } from '@tanstack/react-router';
import { buildMediaPath } from '@/helpers';
import { useQuery } from '@tanstack/react-query';
import { FilmsApi } from '@/api';

export const RandomFilms = () => {
  const { data } = useQuery({
    queryKey: ['random-films'],
    queryFn: FilmsApi.getRandomFilms,
  });

  if (!data) {
    return null;
  }

  return (
    <ScrollableWrapper className={styles.randomFilms}>
      {data.map((film) => (
        <Link
          to="/film/$filmId"
          params={{ filmId: film._id }}
          key={film._id}
          className={styles.filmLink}
        >
          <Image src={buildMediaPath(film.poster)} className={styles.image} />
        </Link>
      ))}
    </ScrollableWrapper>
  );
};
