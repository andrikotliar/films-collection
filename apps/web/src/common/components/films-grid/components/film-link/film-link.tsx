import { forwardRef } from 'react';
import { type FilmsListItem, getYearFromDate, Image } from '~/common';
import styles from './styles.module.css';
import { Link } from '@tanstack/react-router';

type Props = {
  data: FilmsListItem;
};

export const FilmLink = forwardRef<HTMLAnchorElement, Props>(({ data }, ref) => {
  return (
    <Link
      className={styles.filmLink}
      to="/films/$id"
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
});
