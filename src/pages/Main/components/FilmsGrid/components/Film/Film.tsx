import { FilmData } from '@/common';
import classes from './Film.module.css';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

type FilmProps = {
  data: FilmData;
};

const Film = forwardRef<HTMLAnchorElement, FilmProps>(({ data }, ref) => {
  return (
    <Link
      className={classes.film}
      to={`/film/${data.id}`}
      key={data.id}
      ref={ref}
    >
      {data?.ordered && (
        <div className={classes.order}>{data.collections[0].order}</div>
      )}
      <div className={classes.cover}>
        <img src={data.media[0].poster} alt={data.title} />
      </div>
      <h3 className={classes.title}>{data.title}</h3>

      <p className={classes.year}>
        {!data.type.includes('Series') || data.series?.seasons.length === 1
          ? data.year
          : `${data.year} - ${data.series?.seasons.at(-1)?.year}`}
      </p>
    </Link>
  );
});

export { Film };
