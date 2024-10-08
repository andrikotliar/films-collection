import { FilmsListItem } from '@/types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { buildMediaPath, buildRouterLink, getYearFromDate } from '@/helpers';
import styles from './FilmLink.module.css';

type FilmLinkProps = {
  data: FilmsListItem;
};

const FilmLink = forwardRef<HTMLAnchorElement, FilmLinkProps>(
  ({ data }, ref) => {
    return (
      <Link
        className={styles.filmLink}
        to={buildRouterLink('film', data._id)}
        key={data._id}
        ref={ref}
      >
        <div className={styles.cover}>
          <img src={buildMediaPath('posters', data.poster)} alt={data.title} />
        </div>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.year}>{getYearFromDate(data.releaseDate)}</p>
      </Link>
    );
  },
);

export { FilmLink };
