import { FilmData } from '@/common';
import classes from './Film.module.css';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

type FilmProps = {
  data: FilmData;
};

const Film = forwardRef<HTMLAnchorElement, FilmProps>(
  ({ data }, ref) => {
    return (
      <Link
        className={classes.film}
        to={`/film/${data.id}`}
        key={data.id}
        ref={ref}
      >
        {data?.ordered && (
          <div className={classes.order}>
            {data.collections[0].order}
          </div>
        )}
        <div className={classes.cover}>
          <img src={data.posters[0]} alt={data.title} />
        </div>
        <h3 className={classes.title}>{data.title}</h3>
        <p className={classes.year}>
          {data.years.length > 1
            ? `${data.years[0]} - ${data.years.at(-1)}`
            : data.years[0]}
        </p>
      </Link>
    );
  },
);

export { Film };
