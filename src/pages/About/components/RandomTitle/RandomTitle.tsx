import { Link } from 'react-router-dom';
import { useRandomTitle } from './hooks';
import styles from './RandomTitle.module.css';
import { Loader } from '@/components';
import { buildMediaPath } from '@/helpers';
import { useMemo } from 'react';

const RandomTitle = () => {
  const randomTitle = useRandomTitle();

  const directors = useMemo(() => {
    const directors = randomTitle?.crew.find(
      (item) => item.role === 'Directed by',
    );

    if (!directors) {
      return null;
    }

    return directors.people.map((person) => person.name).join(', ');
  }, [randomTitle]);

  if (!randomTitle) {
    return <Loader />;
  }

  return (
    <Link to={`/film/${randomTitle.id}`} className={styles.wrapper}>
      <h2 className={styles.title}>Random title</h2>
      <div className={styles.poster}>
        <img src={buildMediaPath('posters', randomTitle.media[0].poster)} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.movieTitle}>{randomTitle.title}</h3>
        <p>
          {randomTitle.year[0]} - {directors}
        </p>
      </div>
    </Link>
  );
};

export { RandomTitle };
