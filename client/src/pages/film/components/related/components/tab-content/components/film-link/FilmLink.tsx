import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildMediaPath, buildRouterLink } from '@/helpers';

import styles from './FilmLink.module.css';
import classNames from 'classnames';

type FilmLinkProps = {
  id: string;
  poster: string;
  title: string;
  chapter: number | null;
  isActive: boolean;
};

const FilmLink: FC<FilmLinkProps> = ({
  id,
  poster,
  title,
  chapter,
  isActive,
}) => {
  const posterUrl = buildMediaPath('posters', poster);

  return (
    <Link
      to={buildRouterLink('film', id)}
      className={classNames(styles.link, {
        [styles.disabled]: isActive,
      })}
      id={id}
      title={title}
    >
      <img src={posterUrl} alt={title} />
      {chapter && <span className={styles.chapter}>{chapter}</span>}
    </Link>
  );
};

export { FilmLink };
