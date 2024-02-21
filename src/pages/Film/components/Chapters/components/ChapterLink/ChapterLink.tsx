import styles from './ChapterLink.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { buildMediaPath } from '@/helpers';

type ChapterLinkProps = {
  id: string;
  poster: string;
  title: string;
  currentFilmId?: string;
};

const ChapterLink: FC<ChapterLinkProps> = ({
  id,
  poster,
  title,
  currentFilmId,
}) => {
  const posterUrl = buildMediaPath('posters', poster);

  return (
    <Link
      to={`/film/${id}`}
      className={classNames(styles.link, {
        [styles.active]: currentFilmId === id,
      })}
      id={id}
    >
      <img src={posterUrl} alt={title} />
    </Link>
  );
};

export { ChapterLink };
