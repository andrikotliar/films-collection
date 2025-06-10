import { Link } from '@tanstack/react-router';
import classNames from 'classnames';
import { Image } from '@/components';
import styles from './film-link.module.css';

type FilmLinkProps = {
  id: number;
  poster: string;
  title: string;
  chapter: number | null;
  isActive: boolean;
};

export const FilmLink = ({
  id,
  poster,
  title,
  chapter,
  isActive,
}: FilmLinkProps) => {
  return (
    <Link
      to="/film/$id"
      params={{ id: String(id) }}
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
