import { Image, Scrollable } from '@/components';
import styles from './RandomFilms.module.css';
import { Link } from 'react-router-dom';
import { buildMediaPath, buildRouterLink } from '@/helpers';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services';
import { RandomFilmsList } from '@/types';

const RandomFilms = () => {
  const { data } = useQuery({
    queryKey: ['random-films'],
    queryFn: () => apiClient.get<RandomFilmsList>('/films/random'),
  });

  if (!data) {
    return null;
  }

  return (
    <Scrollable className={styles.wrapper}>
      {data.map((film) => (
        <Link
          to={buildRouterLink('film', film._id)}
          key={film._id}
          className={styles.filmLink}
        >
          <Image
            src={buildMediaPath('posters', film.media[0].poster)}
            className={styles.image}
          />
        </Link>
      ))}
    </Scrollable>
  );
};

export { RandomFilms };
