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
    const posterUrl = buildMediaPath('posters', data.media[0].poster);

    return (
      <Link
        className={styles.filmLink}
        to={buildRouterLink('film', data._id)}
        key={data._id}
        ref={ref}
      >
        <div className={styles.cover}>
          <img src={posterUrl} alt={data.title} />
        </div>
        <h3 className={styles.title}>{data.title}</h3>

        <p className={styles.year}>
          {data.releaseDate.length > 1
            ? `${getYearFromDate(data.releaseDate[0])} - ${getYearFromDate(
                data.releaseDate.at(-1),
              )}`
            : getYearFromDate(data.releaseDate[0])}
        </p>
      </Link>
    );
  },
);

export { FilmLink };
