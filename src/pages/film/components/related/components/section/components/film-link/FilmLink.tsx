import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildMediaPath, buildRouterLink } from '@/helpers';

import styles from './FilmLink.module.css';

type Props = {
  id: string;
  poster: string;
  title: string;
  chapter?: number;
};

const FilmLink: FC<Props> = ({ id, poster, title, chapter }) => {
  const posterUrl = buildMediaPath('posters', poster);

  return (
    <Link
      to={buildRouterLink('film', id)}
      className={styles.link}
      id={id}
      title={title}
    >
      <img src={posterUrl} alt={title} />
      {chapter && <span className={styles.chapter}>{chapter}</span>}
    </Link>
  );
};

export { FilmLink };
