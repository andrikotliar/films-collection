import { FilmsListItem } from '@/types';
import { forwardRef } from 'react';
import { buildMediaPath, getYearFromDate } from '@/helpers';
import styles from './FilmLink.module.css';
import { Link } from '@tanstack/react-router';

type FilmLinkProps = {
  data: FilmsListItem;
};

export const FilmLink = forwardRef<HTMLAnchorElement, FilmLinkProps>(
  ({ data }, ref) => {
    return (
      <Link
        className={styles.filmLink}
        to="/film/$filmId"
        params={{ filmId: data._id }}
        key={data._id}
        ref={ref}
      >
        <div className={styles.cover}>
          <img src={buildMediaPath(data.poster)} alt={data.title} />
        </div>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.year}>{getYearFromDate(data.releaseDate)}</p>
      </Link>
    );
  },
);
