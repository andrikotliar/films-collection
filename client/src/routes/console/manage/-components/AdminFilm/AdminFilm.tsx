import { FC } from 'react';
import { LinkIcon } from 'lucide-react';
import { FilmsAdminListItem } from '@/types';
import { Link } from '@tanstack/react-router';
import { Image } from '@/components';
import styles from './AdminFilm.module.css';

type AdminFilmProps = {
  film: FilmsAdminListItem;
};

export const AdminFilm: FC<AdminFilmProps> = ({ film }) => {
  return (
    <div className={styles.film}>
      <div className={styles.poster}>
        <Image src={film.poster} isExternal />
      </div>
      <Link
        to="/film/$filmId"
        params={{ filmId: film.id.toString() }}
        className={styles.title}
      >
        <LinkIcon size={12} /> {film.title}
      </Link>
    </div>
  );
};
