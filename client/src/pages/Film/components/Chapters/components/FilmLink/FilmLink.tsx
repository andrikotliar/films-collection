import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { buildMediaPath, buildRouterLink } from '@/helpers';

import styles from './FilmLink.module.css';
import classNames from 'classnames';
import { Image } from '@/components';

type FilmLinkProps = {
  id: string;
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
  const posterUrl = buildMediaPath(poster);

  return (
    <Link
      to={buildRouterLink('film', id)}
      className={classNames(styles.filmLink, {
        [styles.activeFilmLink]: isActive,
      })}
      id={id}
      title={title}
    >
      <Image src={posterUrl} alt={title} />
      {chapter && <span className={styles.chapterNumber}>{chapter}</span>}
    </Link>
  );
};
