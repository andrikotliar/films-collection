import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import classNames from 'classnames';
import { Image } from '@/ui';
import styles from './FilmLink.module.css';

type FilmLinkProps = {
  id: number;
  poster: string;
  title: string;
  chapter: number | null;
  isActive: boolean;
};

export const FilmLink: FC<FilmLinkProps> = ({
  id,
  poster,
  title,
  chapter,
  isActive,
}) => {
  return (
    <Link
      to="/film/$filmId"
      params={{ filmId: String(id) }}
      className={classNames(styles.filmLink, {
        [styles.activeFilmLink]: isActive,
      })}
      title={title}
    >
      <Image src={poster} alt={title} isExternal />
      {chapter && <span className={styles.chapterNumber}>{chapter}</span>}
    </Link>
  );
};
