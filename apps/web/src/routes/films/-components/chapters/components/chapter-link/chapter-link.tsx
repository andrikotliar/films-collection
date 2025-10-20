import styles from './styles.module.css';
import { Link } from '@tanstack/react-router';
import classNames from 'classnames';
import { Image } from '~/common';

type Props = {
  id: number;
  poster: string;
  title: string;
  chapter: number | null;
  isActive: boolean;
};

export const ChapterLink = ({ id, poster, title, chapter, isActive }: Props) => {
  return (
    <Link
      to="/film/$id"
      params={{ id: String(id) }}
      className={classNames(styles.chapter, isActive && styles.chapter_disabled)}
      title={title}
    >
      <Image src={poster} alt={title} isExternal />
      {chapter && <span className={styles.order}>{chapter}</span>}
    </Link>
  );
};
