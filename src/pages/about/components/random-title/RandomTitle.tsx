import { Link } from 'react-router-dom';
import { buildMediaPath, buildRouterLink } from '@/helpers';
import { useRandomTitle } from './hooks';
import styles from './RandomTitle.module.css';

const RandomTitle = () => {
  const randomTitle = useRandomTitle();

  if (!randomTitle) {
    return null;
  }

  return (
    <Link
      to={buildRouterLink('film', randomTitle.info.id)}
      className={styles.wrapper}
    >
      <h2 className={styles.title}>Random title</h2>
      <div className={styles.poster}>
        <img
          src={buildMediaPath('posters', randomTitle.info.media[0].poster)}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.movieTitle}>{randomTitle.info.title}</h3>
        <p className={styles.summary}>
          {randomTitle.info.year[0]} - {randomTitle.directors}
        </p>
        <p className={styles.description}>{randomTitle.description}</p>
      </div>
    </Link>
  );
};

export { RandomTitle };
