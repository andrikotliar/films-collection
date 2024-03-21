import { FilmData } from '@/common/types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { buildMediaPath } from '@/helpers';

import styles from './FilmLink.module.css';

type Props = {
  data: FilmData;
};

const FilmLink = forwardRef<HTMLAnchorElement, Props>(({ data }, ref) => {
  const posterUrl = buildMediaPath('posters', data.media[0].poster);

  return (
    <Link
      className={styles.film}
      to={`/film/${data.id}`}
      key={data.id}
      ref={ref}
    >
      {data?.ordered && (
        <div className={styles.order}>{data.collections[0].order}</div>
      )}
      <div className={styles.cover}>
        <img src={posterUrl} alt={data.title} />
      </div>
      <h3 className={styles.title}>{data.title}</h3>

      <p className={styles.year}>
        {data.year.length > 1
          ? `${data.year[0]} - ${data.year.at(-1)}`
          : data.year[0]}
      </p>
    </Link>
  );
});

export { FilmLink };
