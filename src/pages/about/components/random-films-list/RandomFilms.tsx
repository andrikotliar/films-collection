import { useRandomFilmIndexes } from '../../hooks';
import { Image, Scrollable } from '@/components';
import { useContext } from 'react';
import { FilmsContext } from '@/context';
import styles from './RandomFilms.module.css';
import { Link } from 'react-router-dom';
import { buildMediaPath, buildRouterLink } from '@/helpers';

const RandomFilms = () => {
  const { films } = useContext(FilmsContext);
  const randomFilmsIndexes = useRandomFilmIndexes(films);

  return (
    <Scrollable className={styles.wrapper}>
      {randomFilmsIndexes.map((index) => (
        <Link
          to={buildRouterLink('film', films[index].id)}
          key={films[index].id}
          className={styles.filmLink}
        >
          <Image
            src={buildMediaPath('posters', films[index].media[0].poster)}
            className={styles.image}
          />
        </Link>
      ))}
    </Scrollable>
  );
};

export { RandomFilms };
