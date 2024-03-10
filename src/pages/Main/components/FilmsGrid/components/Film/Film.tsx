import { FilmData } from '@/common';
import styles from './Film.module.css';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { buildMediaPath } from '@/helpers';

type Props = {
  data: FilmData;
};

const Film = forwardRef<HTMLAnchorElement, Props>(({ data }, ref) => {
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
        {!data.type.includes('Series') || data.series?.seasons.length === 1
          ? data.year
          : `${data.year} - ${data.series?.seasons.at(-1)?.year}`}
      </p>
    </Link>
  );
});

export { Film };
