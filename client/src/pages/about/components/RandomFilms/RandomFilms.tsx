import { Image, ScrollableWrapper } from '@/components';
import styles from './RandomFilms.module.css';
import { Link } from '@tanstack/react-router';
import { buildMediaPath, buildRouterLink } from '@/helpers';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services';
import { RandomFilmsList } from '@/types';

export const RandomFilms = () => {
  const { data } = useQuery({
    queryKey: ['random-films'],
    queryFn: () => apiClient.get<RandomFilmsList>('/films/random'),
  });

  if (!data) {
    return null;
  }

  return (
    <ScrollableWrapper className={styles.randomFilms}>
      {data.map((film) => (
        <Link
          to={buildRouterLink('film', film._id)}
          key={film._id}
          className={styles.filmLink}
        >
          <Image src={buildMediaPath(film.poster)} className={styles.image} />
        </Link>
      ))}
    </ScrollableWrapper>
  );
};
