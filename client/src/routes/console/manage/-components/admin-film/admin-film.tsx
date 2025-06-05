import styles from './admin-film.module.css';
import { FC } from 'react';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { FilmsAdminListItem } from '@/types';
import { Link } from '@tanstack/react-router';
import { Button, IconLink } from '@/components';

type AdminFilmProps = {
  film: FilmsAdminListItem;
};

export const AdminFilm: FC<AdminFilmProps> = ({ film }) => {
  return (
    <div className={styles.film}>
      <Link
        to="/film/$id"
        params={{ id: film.id.toString() }}
        className={styles.title}
      >
        {film.title}
      </Link>
      <div className={styles.tools}>
        <IconLink
          icon={<PencilIcon size={20} />}
          to="/console/manage/$id"
          params={{ id: film.id.toString() }}
        />
        <Button icon={<Trash2Icon size={20} />} variant="ghost" />
      </div>
    </div>
  );
};
