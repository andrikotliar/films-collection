import { FilmsListItem } from '@/types';
import { forwardRef } from 'react';
import { getYearFromDate } from '@/helpers';
import styles from './FilmLink.module.css';
import { Link } from '@tanstack/react-router';
import { Image } from '@/ui/Image/Image';

type FilmLinkProps = {
  data: FilmsListItem;
};

export const FilmLink = forwardRef<HTMLAnchorElement, FilmLinkProps>(
  ({ data }, ref) => {
    return (
      <Link
        className={styles.filmLink}
        to="/film/$filmId"
        params={{ filmId: String(data.id) }}
        key={data.id}
        ref={ref}
      >
        <div className={styles.cover}>
          <Image src={data.poster} alt={data.title} isExternal />
        </div>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.year}>{getYearFromDate(data.releaseDate)}</p>
      </Link>
    );
  },
);
