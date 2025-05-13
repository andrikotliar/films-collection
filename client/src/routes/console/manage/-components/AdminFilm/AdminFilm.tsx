import { FC } from 'react';
import { LinkIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { FilmsAdminListItem } from '@/types';
import { Link } from '@tanstack/react-router';
import { Button, IconLink, Image } from '@/ui';
import styles from './AdminFilm.module.css';

type AdminFilmProps = {
  film: FilmsAdminListItem;
  onDelete: (film: FilmsAdminListItem) => void;
};

export const AdminFilm: FC<AdminFilmProps> = ({ film, onDelete }) => {
  return (
    <div className={styles.film}>
      <div className={styles.tools}>
        <IconLink
          icon={<PencilIcon size={18} />}
          to="/console/manage/$id"
          params={{ id: film.id.toString() }}
        />
        <Button
          variant="ghost"
          icon={<Trash2Icon />}
          onClick={() => onDelete(film)}
        />
      </div>
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
