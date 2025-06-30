import { FilmsListItem } from '@/types';
import { forwardRef } from 'react';
import { getYearFromDate } from '@/helpers';
import styles from './film-link.module.css';
import { Link } from '@tanstack/react-router';
import { Image } from '@/components/image/image';

type FilmLinkProps = {
  data: FilmsListItem;
};

export const FilmLink = forwardRef<HTMLAnchorElement, FilmLinkProps>(
  ({ data }, ref) => {
    return (
      <Link
        className={styles.filmLink}
        to="/film/$id"
        params={{ id: String(data.id) }}
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
