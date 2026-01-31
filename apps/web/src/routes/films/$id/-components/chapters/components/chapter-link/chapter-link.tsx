import styles from './chapter-link.module.css';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { Image } from '~/shared';

type ChapterLinkProps = {
  id: number;
  poster: string | null;
  title: string;
  chapter: number | null;
  isActive: boolean;
};

export const ChapterLink = ({ id, poster, title, chapter, isActive }: ChapterLinkProps) => {
  return (
    <Link
      to="/films/$id"
      params={{ id: String(id) }}
      className={clsx(styles.chapter, isActive && styles.chapter_disabled)}
      title={title}
    >
      <Image src={poster} alt={title} />
      {chapter && <span className={styles.order}>{chapter}</span>}
    </Link>
  );
};
